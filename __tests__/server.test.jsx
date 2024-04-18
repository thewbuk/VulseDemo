import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { app } from "../app/api/server";

describe("Todo API", () => {
  it("should create a new todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ title: "New Todo" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("New Todo");
    expect(res.body.completed).toBe(false);
  });
});
