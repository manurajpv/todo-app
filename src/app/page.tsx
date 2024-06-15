import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      <TodoList/>
    </main>
  )
}
