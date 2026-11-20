import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      location,
      imageUrl,
      startDate,
      endDate,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Check whether dates are valid
    const eventStartDate = new Date(startDate);
    const eventEndDate = new Date(endDate);

    if (
      isNaN(eventStartDate.getTime()) ||
      isNaN(eventEndDate.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid event dates",
      });
    }

    if (eventEndDate <= eventStartDate) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Create event in database
    const event = await prisma.event.create({
      data: {
        title,
        description,
        category,
        location,
        imageUrl,
        startDate: eventStartDate,
        endDate: eventEndDate,
        organizerId: req.user!.userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};