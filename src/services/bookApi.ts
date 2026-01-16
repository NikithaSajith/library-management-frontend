import { Book } from "@/types/book";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(`${BASE_URL}/api/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function addBook(book: Omit<Book, "id">): Promise<Book> {

  const res = await fetch(`${BASE_URL}/api/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
}

export async function updateBook(book: Book): Promise<Book> {
  const res = await fetch(`${BASE_URL}/api/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!res.ok) {
    throw new Error("Failed to update book");
  }

  return res.json();
}

export async function borrowBook(id: number, username: string): Promise<Book> {
  const res = await fetch(
    `${BASE_URL}/api/books/${id}/borrow?username=${username}`,
    { method: "PUT" }
  );

  if (!res.ok) throw new Error("Failed to borrow book");
  return res.json();
}


export async function deleteBook(id: number): Promise<void> {
  await fetch(`${BASE_URL}/api/books/${id}`, {
    method: "DELETE",
  });
}
