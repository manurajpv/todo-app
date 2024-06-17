"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { generateOTP, sendMail } from "@/lib/helper";
import { MailObj } from "@/lib/types";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    full_name: formData.get("name") as string,
  };

  const { error } = await supabase.from("users").insert(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function generateSendOTP(formData: FormData) {
  console.log(formData);
  const data = {
    email: formData.get("email") as string,
    full_name: formData.get("name") as string,
  };

  generateOTP().then(async (otp) => {
    const mailBody: MailObj = {
      to: data.email,
      body: "Please enter the OTP " + otp + " to continue",
      subject: "OTP for ToDo Authentication",
    };
    try {
      await sendMail(mailBody).then(() => {
        return true;
      });
    } catch (err) {
      return false;
    }
  });
}
