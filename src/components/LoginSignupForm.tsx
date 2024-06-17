"use client";
import { generateSendOTP, signup } from "@/app/login/actions";
import { ChevronRight, Lock, Mail, MoveRight, SquareUser } from "lucide-react";
import { FormEvent, useState } from "react";

export default function LoginSignupForm() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  const [showLogin, changeShowLogin] = useState<boolean>(true);
  const [signupStep, changeSignupStep] = useState<number>(0);

  const toggleLogin = () => {
    changeShowLogin(!showLogin);
  };
  const handleSignUpStep1 = async (formData: FormData) => {
    generateSendOTP(formData).then((response) => {
      if (response) {
        changeSignupStep(1);
      }
    });
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        {showLogin ? (
          <div>
            <h2 className="card-title text-3xl">Login</h2>

            <form onSubmit={onSubmit} className="pt-6 flex gap-5 flex-col">
              <label className="input input-bordered flex items-center gap-2">
                <Mail />
                <input type="text" className="grow" placeholder="Email" />
              </label>
              {/* <label className="input input-bordered flex items-center gap-2">
                <Lock />
                <input type="password" className="grow" placeholder="password" />
              </label> */}
              <button
                type="submit"
                className="btn btn-primary text-lg text-gray-100 float-right mt-5"
              >
                Login with email
                <ChevronRight />
              </button>
            </form>
            <div className="flex pt-2">
              <span>Don't have an account?</span>
              <p
                className="font-medium px-2 underline cursor-pointer"
                onClick={toggleLogin}
              >
                Sign up
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="card-title text-3xl">Sign Up</h2>
            <form className="pt-6 flex gap-5 flex-col">
              <label className="input input-bordered flex items-center gap-2">
                <SquareUser />
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="grow"
                  placeholder="Name"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Mail />
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="grow"
                  placeholder="Email"
                />
              </label>
              <button
                formAction={handleSignUpStep1}
                type="submit"
                className="btn btn-primary text-lg text-gray-100 float-right mt-5"
              >
                Sign up now
                <ChevronRight />
              </button>
            </form>
            <div className="flex pt-2">
              <span>Already have an account?</span>
              <p
                className="font-medium px-2 underline cursor-pointer"
                onClick={toggleLogin}
              >
                Login
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
