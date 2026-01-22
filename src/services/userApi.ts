import { User } from "@/types/user";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// READ
export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/api/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

// CREATE
export async function addUser(user: Omit<User, "id">): Promise<User> {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
}

// UPDATE
export async function updateUser(user: User): Promise<User> {
  const res = await fetch(`${BASE_URL}/api/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

// SOFT DELETE
export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
}


