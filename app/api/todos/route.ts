import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { title, userId } = json;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      // If the user doesn't exist, create a new user
      await prisma.user.create({
        data: {
          id: userId,
          email: `user${userId}@example.com`,
          name: `User ${userId}`,
        },
      });
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        completed: false,
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
