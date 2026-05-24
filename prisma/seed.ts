

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {

  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse",
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "iPhone 15",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Samsung S24",
    },
  });

  await prisma.inventory.createMany({
    data: [
      {
        productId: product1.id,
        warehouseId: warehouse1.id,
        totalStock: 10,
        reservedStock: 0,
      },
      {
        productId: product1.id,
        warehouseId: warehouse2.id,
        totalStock: 5,
        reservedStock: 0,
      },
      {
        productId: product2.id,
        warehouseId: warehouse1.id,
        totalStock: 8,
        reservedStock: 0,
      },
    ],
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });