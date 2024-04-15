import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    const todos = await prisma.todo.findMany({
      where: { userId: session.user.id },
    });
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
        userId: session?.user.id,
      },
    });
    res.status(201).json(todo);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}