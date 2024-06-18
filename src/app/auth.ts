"use server"
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { cookies } from "next/headers";

export default async function AuthenticateUser() {
  const cookieStore = cookies();
  console.log(cookieStore)
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  console.log(data?.user)
  console.log(error)
  if (error || !data?.user) {
    // redirect('/login')
    console.log(error)
  }
}