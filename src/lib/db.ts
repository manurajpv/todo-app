"use server";
import { createClient } from "@/utils/supabase/server";
import { TodoItem } from "./types";
import { User } from "@supabase/supabase-js";

export const updateTodo = async (
  user: User | null | undefined,
  todo: TodoItem[]
): Promise<{ success: boolean; message: string }> => {
  console.log(todo);
  if (user !== null && user !== undefined) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.log(error);
      return { success: false, message: "Failed to update ToDo" };
    }
    if (data.length > 0) {
      const { error } = await supabase
        .from("todos")
        .update({ todo_array: todo })
        .eq("user_id", user.id);
      if (error) {
        console.log(error);
        return { success: false, message: "Failed to update ToDo" };
      }
      return { success: true, message: "Added/Updated Todo successfully" };
    } else {
      const { error } = await supabase
        .from("todos")
        .insert({ user_id: user.id, todo_array: todo });
      if (error) {
        console.log(error);
        return { success: false, message: "Failed to update ToDo" };
      }
      return { success: true, message: "Added/Updated Todo successfully" };
    }
  } else {
    return { success: false, message: "Failed to update ToDo" };
  }
};

export const fetchTodos = async (user: User | null | undefined) => {
  if (user !== null && user !== undefined) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("todos")
      .select("todo_array")
      .eq("user_id", user.id);
    if (error) {
      console.log(error);
      return { success: false, message: "Failed to fetch ToDo" };
    }
    return { success: true, message: JSON.stringify(data[0].todo_array) };
  } else {
    return { success: false, message: "Failed to fetch ToDo" };
  }
};
