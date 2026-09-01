"use server";
import { supabase } from "./supabase";
import { auth, signIn, signOut } from "@/app/_lib/auth";

export async function signInoption() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutoption() {
  await signOut({ redirectTo: "/account" });
}

export async function updateprofile(formData) {
  const session = await auth();

  const updatedFields = {
    nationality: formData.get("nationality"),
    nationalID: formData.get("nationalID"),
  };

  const { error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    throw new Error("Guest could not be updated");
  }
}
