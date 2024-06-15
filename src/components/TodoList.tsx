"use client";

import { generateRandomId } from "@/lib/helper";
import { TodoItem } from "@/lib/types";
import { Plus } from "lucide-react";
import React, { useState } from "react";

function TodoList() {
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
      console.log(list);
    }
  };
  return (
    <div>
      <div className="card w-100 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Tasks!</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
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
        </div>
      </div>
    </div>
  );
}

export default TodoList;
