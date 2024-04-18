"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
});

export default function TodoList() {
  const { todos, isLoading, addTodo, updateTodo, deleteTodo } = useTodos();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const userId = "1";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await addTodo(values.title, userId);
    form.reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a new todo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="hover:scale-105 transition">
            Create Todo
          </Button>
        </form>
      </Form>
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 mt-4">Todo List</h2>
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
                  className="ml-auto hover:scale-105 transition"
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
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, userId }),
    });

    if (!res.ok) {
      // If the request fails, remove the optimistically added todo
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== newTodo.id)
      );
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
