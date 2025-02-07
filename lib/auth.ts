// lib/auth.ts (Server Action)
"use server";
import { currentUser } from "@clerk/nextjs/server";

export async function getUser() {
  return await currentUser();
}
