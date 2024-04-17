import express from "express";
import { z } from "zod";
// import prisma from "@/lib/prisma";
import cors from "cors";
import prisma from "./../../lib/prisma";

export const app = express();
app.use(cors());
app.use(express.json());

const todoSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional(),
});

app.get("/api/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  try {
    const { title } = todoSchema.parse(req.body);
    const todo = await prisma.todo.create({
      data: {
        title,
        completed: false,
        userId: "1",
      },
    });
    res.status(201).json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.patch("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = todoSchema.parse(req.body);
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    res.json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id },
  });
  res.sendStatus(204);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
