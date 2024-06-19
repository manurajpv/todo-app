"use server";
import { cookies } from "next/headers";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

export default async function AuthenticateUser() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options });
        },
      },
    },
  );
  await supabase.auth.getUser().then((res) => {
    if (res.error || !res?.data.user) {
      return redirect("/login");
    }
    console.log(res.data.user);
    return res?.data.user;
  });
}
