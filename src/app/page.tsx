import Todo from "@/components/Todo";
import { CircleUser, ListTodo } from "lucide-react";
import AuthenticateUser from "./auth";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Logout from "@/components/Logout";

export default async function Home() {
  const session: User | null | undefined = await AuthenticateUser();
  return (
    <div className="min-h-screen">
      <nav className="flex justify-between items-center p-4 h-20">
        <h1 className="lg:text-3xl text-xl font-bold flex items-center gap-2">
          <ListTodo className="h-10 w-10" />
          Todo App
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-xl flex items-center gap-2 border-2 px-3 py-2 rounded-md border-indigo-500/100">
            {session?.user_metadata.avatar_url ? (
              <Image alt="avatar" className="border-1 rounded-full" src={session?.user_metadata.avatar_url} width={30} height={30}></Image>
            ) : (
              <CircleUser />
            )}  
            <span>
              {session?.user_metadata.full_name
                ? session?.user_metadata.full_name
                : session?.email}
            </span>
          </span>
              <Logout/>
        </div>
      </nav>
      <main className="flex justify-center items-center py-4">
        <Todo session={session} />
      </main>
    </div>
  );
}
