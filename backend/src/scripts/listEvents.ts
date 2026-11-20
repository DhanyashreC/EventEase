import "dotenv/config";
import prisma from "../config/prisma";

async function main() {
  const events = await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      status: true,
    },
  });

  console.log("EVENTS IN DATABASE:");

  events.forEach((event) => {
    console.log("----------------------");
    console.log("Title:", event.title);
    console.log("ID:", event.id);
    console.log("Status:", event.status);
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });