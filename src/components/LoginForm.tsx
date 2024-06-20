"use client";
import { handleEmailLogin } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/client";
import { ChevronRight, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Toaster, toast } from "sonner";

export default function LoginForm() {
  const handleGoogleSignin = () => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div>
          <h2 className="card-title text-3xl">Login</h2>
          <form className="pt-6 flex gap-5 flex-col">
            <label className="input input-bordered flex items-center gap-2">
              <Mail />
              <input
                type="text"
                id="email"
                name="email"
                className="grow"
                placeholder="Email"
                required
              />
            </label>
            {/* <label className="input input-bordered flex items-center gap-2">
                <Lock />
                <input type="password" className="grow" placeholder="password" />
              </label> */}
            <button
              formAction={(formData) => {
                handleEmailLogin(formData).then((res) => {
                  if (res.success) {
                    toast.success(res.message);
                  } else {
                    toast.error(res.message);
                  }
                });
              }}
              type="submit"
              className="btn btn-primary text-lg text-gray-100 float-right mt-5"
            >
              Login with email
              <ChevronRight />
            </button>
          </form>
          <div className="flex items-center justify-center flex-col gap-3 mt-3  ">
            <span>OR </span>
            <button className="btn btn-neutral" onClick={handleGoogleSignin}>
              <FcGoogle className="h-5 w-5" />
              Login with Google
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
