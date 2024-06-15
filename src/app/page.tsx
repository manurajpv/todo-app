import Todo from "@/components/Todo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      <Todo />
    </main>
  );
}
