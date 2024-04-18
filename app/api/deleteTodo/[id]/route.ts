//api/deleteTodo/[id]/route.ts
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`http://localhost:4000/todos/${params.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(null);
}
