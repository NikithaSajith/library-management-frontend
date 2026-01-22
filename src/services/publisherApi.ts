import { Publisher } from "@/types/publisher";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPublishers(): Promise<Publisher[]> {
  const res = await fetch(`${BASE_URL}/api/publishers`);
  if (!res.ok) throw new Error("Failed to fetch publishers");
  return res.json();
}

export async function addPublisher(name: string): Promise<Publisher> {
  const res = await fetch(`${BASE_URL}/api/publishers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Failed to add publisher");
  return res.json();
}
