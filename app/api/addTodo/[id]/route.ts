//api/addTodo/[id]/route.ts
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const userId = params.id;

    const res = await fetch(`http://localhost:4000/todos/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });

    if (!res.ok) {
      throw new Error("Failed to create todo");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
