"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function Todos() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleComplete = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      {session ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center mb-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => handleComplete(todo.id)}
              />
              <span className={`ml-2 ${todo.completed ? "line-through" : ""}`}>
                {todo.title}
              </span>
              <Button
                variant="destructive"
                size="sm"
                className="ml-auto"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Please sign in to view your todos.</p>
      )}
    </div>
  );
}
