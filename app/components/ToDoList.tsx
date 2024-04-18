"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const { todos, isLoading, addTodo, updateTodo, deleteTodo } = useTodos();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const userId = "1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTodo(title, userId);
    setTitle("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new todo"
        />
        <Button type="submit">Create Todo</Button>
      </form>
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Todo List</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center mb-2">
                <Checkbox
                  checked={todo.completed}
                  onChange={() => updateTodo(todo.id, !todo.completed)}
                />
                <span
                  className={`ml-2 ${todo.completed ? "line-through" : ""}`}
                >
                  {todo.title}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-auto"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
    setIsLoading(false);
  };

  const addTodo = async (title: string, userId: string) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, userId }),
    });
    if (res.ok) {
      await fetchTodos();
    }
  };

  const updateTodo = async (id: string, completed: boolean) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (res.ok) {
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      );
    }
  };

  const deleteTodo = async (id: string) => {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    }
  };

  return { todos, isLoading, addTodo, updateTodo, deleteTodo };
}
