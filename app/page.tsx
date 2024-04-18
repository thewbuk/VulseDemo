// File: app/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TodoList from "./components/ToDoList";

export default function Home() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const router = useRouter();
  const userId = "1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, userId }),
    });
    if (response.ok) {
      setTitle("");
      router.refresh();
    } else {
      const errorData = await response.json();
      console.error("Failed to create todo:", errorData.error);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new todo"
        />
        <Button type="submit">Create Todo</Button>
      </form>
      <TodoList />
    </div>
  );
}
