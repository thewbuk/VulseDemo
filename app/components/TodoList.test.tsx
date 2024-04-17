import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList", () => {
  it("renders todo items", async () => {
    const todos = [
      { id: "1", title: "Todo 1", completed: false },
      { id: "2", title: "Todo 2", completed: true },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(todos),
    });

    render(<TodoList />);

    expect(await screen.findByText("Todo 1")).toBeInTheDocument();
    expect(await screen.findByText("Todo 2")).toBeInTheDocument();
  });
});
