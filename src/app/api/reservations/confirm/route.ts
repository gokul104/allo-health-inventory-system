import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { reservationId } = body;

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: reservationId,
        },
      });

    if (!reservation) {

      return NextResponse.json(
        {
          message: "Reservation not found",
        },
        {
          status: 404,
        }
      );
    }

    if (reservation.status !== "PENDING") {

      return NextResponse.json(
        {
          message: "Reservation already processed",
        },
        {
          status: 400,
        }
      );
    }

    const updated =
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: "CONFIRMED",
        },
      });

    return NextResponse.json(updated);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Confirmation failed",
      },
      {
        status: 500,
      }
    );
  }
}