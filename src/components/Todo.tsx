"use client";
import { generateRandomId, parseTodoFromString } from "@/lib/helper";
import { TodoItem } from "@/lib/types";
import { Plus } from "lucide-react";
import React, {
  createContext,
  useState,
  SetStateAction,
  useEffect,
} from "react";
import { User } from "@supabase/supabase-js";
import TodoList from "./TodoList";
import { fetchTodos, updateTodo } from "@/lib/db";
import { Toaster, toast } from "sonner";

export const UserContext = createContext<User | null | undefined>(null);

function Todo({ session }: { session: User | null | undefined }) {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState<TodoItem[]>([]);
  const [user, setUser] = useState<User | null | undefined>(session);
  const updateTodoInDB = (user: User | null | undefined, todo: TodoItem[]) => {
    updateTodo(user, list).then(({ success, message }) => {
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      return true;
    });
  };
  const handleAddTodo = () => {
    if (userInput !== "") {
      generateRandomId().then((num: number) => {
        const newTodo: TodoItem = {
          id: num,
          title: userInput,
          is_completed: false,
        };
        setList([...list, newTodo]);
        setUserInput("");
        updateTodoInDB(user, list);
      });
    }
  };
  useEffect(() => {
    if (list.length === 0) {
      fetchTodos(user).then((res) => {
        if (res?.success) {
          console.log(JSON.parse(res.message));
          setList(JSON.parse(res.message))
        }
      });
    }
  }),
    [user];
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
          <UserContext.Provider value={session}>
            <TodoList items={list} setItems={setList} />
          </UserContext.Provider>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Todo;
