"use client";

import { generateRandomId } from "@/lib/helper";
import { TodoItem } from "@/lib/types";
import { Plus } from "lucide-react";
import React, { useState, SetStateAction } from "react";
import TodoList from "./TodoList";

function Todo() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState<TodoItem[]>([]);
  const handleAddTodo = () => {
    if (userInput !== "") {
      const newTodo: TodoItem = {
        id: generateRandomId(),
        title: userInput,
        is_completed: false,
      };
      setList([...list, newTodo]);
      setUserInput("");
    }
  };
  return (
    <div className="w-11/12 md:w-1/2">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Tasks!</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full"
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              value={userInput}
            />
            <button
              className="btn btn-square btn-outline"
              onClick={handleAddTodo}
            >
              <Plus />
            </button>
          </div>
          <TodoList items={list} setItems={setList} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
