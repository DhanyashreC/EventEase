import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { eventId, items } = req.body;
    const userId = req.user!.userId;

    // Validate required fields
    if (!eventId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Event ID and ticket items are required",
      });
    }

    // Validate ticket items
    for (const item of items) {
      if (
        !item.ticketTypeId ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid ticket type or quantity",
        });
      }
    }

    // Prevent duplicate ticket types in one request
    const ticketTypeIds = items.map((item) => item.ticketTypeId);

    if (new Set(ticketTypeIds).size !== ticketTypeIds.length) {
      return res.status(400).json({
        success: false,
        message: "Duplicate ticket types are not allowed",
      });
    }

    // Create booking using a database transaction
    const booking = await prisma.$transaction(async (tx) => {
      // Check if event exists
      const event = await tx.event.findUnique({
        where: { id: eventId },
      });

      if (!event) {
        throw new Error("EVENT_NOT_FOUND");
      }

      // Get ticket types belonging to this event
      const ticketTypes = await tx.ticketType.findMany({
        where: {
          id: { in: ticketTypeIds },
          eventId,
        },
      });

      if (ticketTypes.length !== items.length) {
        throw new Error("INVALID_TICKET_TYPES");
      }

      // Calculate total using database prices
      let totalAmount = 0;

      const bookingItemsData = items.map((item) => {
        const ticketType = ticketTypes.find(
          (ticket) => ticket.id === item.ticketTypeId
        );

        if (!ticketType) {
          throw new Error("INVALID_TICKET_TYPES");
        }

        totalAmount += Number(ticketType.price) * item.quantity;

        return {
          ticketTypeId: ticketType.id,
          quantity: item.quantity,
          price: ticketType.price,
        };
      });

      // Check and decrease available inventory safely
      for (const item of items) {
        const updateResult = await tx.ticketType.updateMany({
          where: {
            id: item.ticketTypeId,
            eventId,
            availableQuantity: {
              gte: item.quantity,
            },
          },
          data: {
            availableQuantity: {
              decrement: item.quantity,
            },
          },
        });

        if (updateResult.count !== 1) {
          throw new Error("INSUFFICIENT_TICKETS");
        }
      }

      // Generate booking code
      const bookingCode = `EE-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`;

      // Create booking
      const newBooking = await tx.booking.create({
        data: {
          bookingCode,
          totalAmount,
          userId,
          eventId,
          items: {
            create: bookingItemsData,
          },
        },
        include: {
          event: true,
          items: {
            include: {
              ticketType: true,
            },
          },
        },
      });

      return newBooking;
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    if (error instanceof Error) {
      if (error.message === "EVENT_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Event not found",
        });
      }

      if (error.message === "INVALID_TICKET_TYPES") {
        return res.status(400).json({
          success: false,
          message: "Invalid ticket types for this event",
        });
      }

      if (error.message === "INSUFFICIENT_TICKETS") {
        return res.status(409).json({
          success: false,
          message: "Not enough tickets available",
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};
export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const bookings = await prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        event: true,
        items: {
          include: {
            ticketType: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get my bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};