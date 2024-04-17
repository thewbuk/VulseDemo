import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const json = await request.json();
    const { completed } = todoSchema.parse(json);
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return NextResponse.json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.todo.delete({
    where: { id },
  });
  return new NextResponse(null, { status: 204 });
}
