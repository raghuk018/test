import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { doctorId, patientName, appointmentTime, mode } = await req.json();

    // 1. Create patient (or reuse if already exists)
    const patient = await prisma.patient.create({
      data: { name: patientName },
    });

    // 2. Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(appointmentTime),
        mode: mode || "online",
        status: "pending",
        doctorId,
        patientId: patient.id,
      },
      include: { doctor: true, patient: true },
    });

    return NextResponse.json(appointment);
  } catch (error: any) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { date: "desc" },
      include: { doctor: true, patient: true },
    });
    return NextResponse.json(appointments);
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
