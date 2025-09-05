import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(doctors);
  } catch (error: any) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, specialization } = body || {};
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const doctor = await prisma.doctor.create({
      data: { name, specialization },
    });
    return NextResponse.json(doctor, { status: 201 });
  } catch (error: any) {
    console.error("Error creating doctor:", error);
    return NextResponse.json(
      { error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}


