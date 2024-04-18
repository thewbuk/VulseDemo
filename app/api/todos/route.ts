import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:4000/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { title, userId } = json;

    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, userId }),
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
