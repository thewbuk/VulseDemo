// tests/TodoList.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./../app/components/TodoList";
import { useState as useStateMock } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("TodoList Component", () => {
  const setTodosMock = jest.fn();
  const initialState = [{ id: "1", title: "Test Todo", completed: false }];

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setTodosMock]);
    render(<TodoList />);
  });

  it("should display todo title", () => {
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("should handle checkbox click", () => {
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(setTodosMock).toHaveBeenCalledTimes(1);
  });

  it("should handle delete button click", () => {
    const button = screen.getByText("Delete");
    fireEvent.click(button);
    expect(setTodosMock).toHaveBeenCalledTimes(1);
  });
});
