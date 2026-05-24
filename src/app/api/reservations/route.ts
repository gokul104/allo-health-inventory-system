import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { inventoryId, quantity } = body;

    const result = await prisma.$transaction(
      async (tx) => {

        const inventory =
          await tx.inventory.findUnique({
            where: {
              id: inventoryId,
            },
          });

        if (!inventory) {
          throw new Error("Inventory not found");
        }

        const availableStock =
          inventory.totalStock -
          inventory.reservedStock;

        if (availableStock < quantity) {

          return {
            error: "Not enough stock",
          };
        }

        await tx.inventory.update({
          where: {
            id: inventoryId,
          },
          data: {
            reservedStock: {
              increment: quantity,
            },
          },
        });

        const reservation =
          await tx.reservation.create({
            data: {
              inventoryId,
              quantity,

              status: "PENDING",

              expiresAt: new Date(
                Date.now() + 10 * 60 * 1000
              ),
            },
          });

        return reservation;
      },
      {
        isolationLevel: "Serializable",
      }
    );

    if ("error" in result) {

      return NextResponse.json(
        {
          message: result.error,
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(result);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Reservation failed",
      },
      {
        status: 500,
      }
    );
  }
}