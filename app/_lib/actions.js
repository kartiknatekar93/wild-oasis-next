"use server";
import { signIn, signOut } from "@/app/_lib/auth";

export async function signInoption() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutoption() {
  await signOut({ redirectTo: "/account" });
}
