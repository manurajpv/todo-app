"use server";
import { createClient } from "@/utils/supabase/server";
import { generateOTP, sendMail } from "@/lib/helper";
import { MailObj } from "@/lib/types";

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

export const handleEmailLogin = async (formData: FormData) => {
  if (formData.get("email") as string === "") return({ "success": false, "message": "Please try again later" })
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: formData.get("email") as string,
      options: {
        shouldCreateUser: true,
      },
    })
    if (error) {
      console.log(error)
      return { "success": false, "message": "invalid email address" }
    }
    return { "success": true, "message": "Please check your email to continue" }
  } catch (err) {
    console.log(err)
    return { "success": false, "message": "Please try again later" }
  }
}

export const handleGoogleSignin = async ()=>{
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options:{
      redirectTo:"http://localhost:3000/auth/callback"
    }
  })
}