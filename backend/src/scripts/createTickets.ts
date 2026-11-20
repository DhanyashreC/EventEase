import "dotenv/config";
import prisma from "../config/prisma";

async function main() {
  const eventId = "b5ffef18-e607-409d-919e-55b171c672a3";

  // Check whether tickets already exist
  const existingTickets = await prisma.ticketType.findMany({
    where: { eventId },
  });

  if (existingTickets.length > 0) {
    console.log("Tickets already exist for this event:");
    console.log(existingTickets);
    return;
  }

  await prisma.ticketType.createMany({
    data: [
      {
        name: "General Admission",
        price: 299,
        totalQuantity: 100,
        availableQuantity: 100,
        eventId,
      },
      {
        name: "VIP Pass",
        price: 799,
        totalQuantity: 50,
        availableQuantity: 50,
        eventId,
      },
    ],
  });

  console.log("🎟️ Tickets created successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });