"use server";

import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function login(prevState: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { message: "Username and password are required" };
  }

  const response = await fetch(`${process.env.API_HOST}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.text();
    return { message: error };
  }

  const data = await response.json();

  await createSession(data);
  redirect("/");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
