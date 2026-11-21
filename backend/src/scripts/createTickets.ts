import "dotenv/config";
import prisma from "../config/prisma";

async function main() {
  const events = [
    {
      id: "b5ffef18-e607-409d-919e-55b171c672a3",
      name: "Tech Fest 2026",
      tickets: [
        { name: "General Admission", price: 299, quantity: 100 },
        { name: "VIP Pass", price: 799, quantity: 50 },
      ],
    },
    {
      id: "1",
      name: "Music Night 2026",
      tickets: [
        { name: "General Admission", price: 499, quantity: 200 },
        { name: "VIP Pass", price: 999, quantity: 50 },
      ],
    },
    {
      id: "3",
      name: "Startup Summit 2026",
      tickets: [
        { name: "Student Pass", price: 299, quantity: 100 },
        { name: "Premium Pass", price: 999, quantity: 50 },
      ],
    },
    {
      id: "2",
      name: "Coding Competition 2026",
      tickets: [
        { name: "Participant Pass", price: 199, quantity: 100 },
      ],
    },
    {
      id: "55082b54-1864-411d-96a6-720a6542b748",
      name: "Photography Workshop",
      tickets: [
        { name: "Workshop Pass", price: 499, quantity: 50 },
      ],
    },
    {
      id: "5",
      name: "Food Festival 2026",
      tickets: [
        { name: "Entry Pass", price: 149, quantity: 300 },
        { name: "Premium Food Pass", price: 499, quantity: 100 },
      ],
    },
    {
      id: "4",
      name: "Dance Competition 2026",
      tickets: [
        { name: "General Admission", price: 199, quantity: 200 },
        { name: "VIP Pass", price: 499, quantity: 50 },
      ],
    },
  ];

  for (const event of events) {
    const existingTickets = await prisma.ticketType.findMany({
      where: { eventId: event.id },
    });

    if (existingTickets.length > 0) {
      console.log(`⏭️ Tickets already exist for ${event.name}`);
      continue;
    }

    await prisma.ticketType.createMany({
      data: event.tickets.map((ticket) => ({
        name: ticket.name,
        price: ticket.price,
        totalQuantity: ticket.quantity,
        availableQuantity: ticket.quantity,
        eventId: event.id,
      })),
    });

    console.log(`🎟️ Tickets created for ${event.name}`);
  }

  console.log("\n🎉 Ticket setup completed!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });