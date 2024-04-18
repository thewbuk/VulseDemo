//api/getAllTodos/route.ts
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
