import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await prisma.todo.deleteMany();
    return NextResponse.json(null);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todos" },
      { status: 500 }
    );
  }
}
