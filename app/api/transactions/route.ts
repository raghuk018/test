import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load transactions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, amount, date } = body || {};
    if (!title || typeof amount !== "number") {
      return NextResponse.json({ error: "title and amount are required" }, { status: 400 });
    }
    const created = await prisma.transaction.create({
      data: { title, amount, date: date ? new Date(date) : new Date() },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}



