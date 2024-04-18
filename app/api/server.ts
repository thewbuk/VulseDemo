import express from "express";
import cors from "cors";
import prisma from "../../lib/prisma";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());

const todoSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional(),
  userId: z.string(),
});

app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  try {
    const { title, userId } = todoSchema.parse(req.body);
    const todo = await prisma.todo.create({
      data: {
        title,
        completed: false,
        user: { connect: { id: userId } },
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

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
