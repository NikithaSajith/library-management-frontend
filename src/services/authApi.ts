import { User } from "@/types/user";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginApi(
  username: string,
  password: string
): Promise<User> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  return res.json();
}
