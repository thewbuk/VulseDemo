// File: app/page.tsx

import TodoList from "./components/ToDoList";

export default function Home() {
  return (
    <div className="container mx-auto">
      <TodoList />
    </div>
  );
}
