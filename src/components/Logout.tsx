"use client";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import React from "react";

function Logout() {
  const handleLogOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      window.location.reload();
    }
  };
  return (
    <div className="tooltip tooltip-bottom" data-tip="Logout">
      <button className="btn btn-square btn-outline">
        <LogOut onClick={handleLogOut} />
      </button>
    </div>
  );
}

export default Logout;
