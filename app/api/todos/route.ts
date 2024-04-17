import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional(),
});

export async function GET(request: Request) {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { title } = todoSchema.parse(json);
    const todo = await prisma.todo.create({
      data: {
        title,
        completed: false,
        userId: "1",
      },
    });
    return NextResponse.json(todo, { status: 201 });
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
