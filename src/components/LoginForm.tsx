"use client";
import { handleEmailLogin } from "@/app/login/actions";
import { ChevronRight, Lock, Mail, MoveRight, SquareUser } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function LoginForm() {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div>
          <h2 className="card-title text-3xl">Login</h2>

          <form className="pt-6 flex gap-5 flex-col">
            <label className="input input-bordered flex items-center gap-2">
              <Mail />
              <input type="text" id="email" name="email" className="grow" placeholder="Email" />
            </label>
            {/* <label className="input input-bordered flex items-center gap-2">
                <Lock />
                <input type="password" className="grow" placeholder="password" />
              </label> */}
            <button
              formAction={(formData) => {
                handleEmailLogin(formData).then((res) => {
                  console.log(res)
                  if (res.success) {
                    toast.success(res.message)
                  } else {
                    toast.error(res.message)
                  }
                })
              }}
              type="submit"
              className="btn btn-primary text-lg text-gray-100 float-right mt-5"
            >
              Login with email
              <ChevronRight />
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
