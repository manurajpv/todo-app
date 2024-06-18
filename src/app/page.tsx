import Todo from "@/components/Todo";
import { CircleUser, ListTodo, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import AuthenticateUser from "./auth";

export default function Home() {
  const user = AuthenticateUser()
  console.log("user", user)
  return (
    <div className="min-h-screen">
      <nav className="flex justify-between items-center p-4 h-20">
        <h1 className="lg:text-3xl text-xl font-bold flex items-center gap-2"><ListTodo className="h-10 w-10" />Todo App</h1>
        <div className="flex items-center gap-4">
          <span className="text-xl flex items-center gap-2 border-2 px-3 py-2 rounded-md border-indigo-500/100"><CircleUser />Username</span>
          <button className="btn btn-square btn-outline">
            <LogOut />
          </button>
        </div>
      </nav>
      <main className="flex justify-center items-center py-4">
        <Todo />
      </main>
    </div>

  );
}
