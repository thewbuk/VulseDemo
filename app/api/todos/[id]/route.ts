import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.todo.delete({
      where: { id: params.id },
    });
    return NextResponse.json(null);
  } catch (error) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { completed } = await request.json();
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { completed },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
}
