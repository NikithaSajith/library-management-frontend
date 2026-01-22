import { Author } from "@/types/author";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAuthors(): Promise<Author[]> {
  const res = await fetch(`${BASE_URL}/api/authors`);
  if (!res.ok) throw new Error("Failed to fetch authors");
  return res.json();
}

export async function addAuthor(name: string): Promise<Author> {
  const res = await fetch(`${BASE_URL}/api/authors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Failed to add author");
  return res.json();
}
