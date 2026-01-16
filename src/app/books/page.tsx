"use client";

import { useAuth } from "@/context/AuthContext";

import { useEffect, useState } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "@/services/bookApi";

import BookTable from "./BookTable";

import AddBookModal from "@/components/books/AddBookModal";
import EditBookModal from "@/components/books/EditBookModal";
import { Book } from "@/types/book";

import { borrowBook } from "@/services/bookApi";



import { useRouter } from "next/navigation";


export default function BooksPage() {
  const { user } = useAuth();
  const router = useRouter();


  const currentUser = user?.username ?? "";
  const currentUserRole = user?.role ?? "USER";

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);


  // STATE
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(console.error);
  }, []);

  const totalBooks = books.length;

  const availableBooks = books.filter(
    book => book.borrowedBy === null
  ).length;

  const borrowedBooks = books.filter(
    book => book.borrowedBy !== null
  ).length;

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [publisher, setPublisher] = useState("");

  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // DROPDOWN DATA
  const categories = Array.from(new Set(books.map(b => b.category)));
  const publishers = Array.from(new Set(books.map(b => b.publisher)));

  // FILTER LOGIC
  const filteredBooks = books.filter(book => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      book.name.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.category.toLowerCase().includes(search) ||
      book.publisher.toLowerCase().includes(search);

    const matchesCategory =
      category === "" || book.category === category;

    const matchesPublisher =
      publisher === "" || book.publisher === publisher;

    return matchesSearch && matchesCategory && matchesPublisher;
  });

  // BORROW / RETURN
  const handleBorrowToggle = async (id: number) => {
    try {
      const updated = await borrowBook(id, currentUser);

      setBooks(prev =>
        prev.map(book =>
          book.id === updated.id ? updated : book
        )
      );
    } catch (err) {
      alert("Book already borrowed by another user");
    }
  };

  // ADD
  const handleAddBook = async (bookData: Omit<Book, "id">) => {
    try {
      const savedBook = await addBook(bookData);
      setBooks(prev => [...prev, savedBook]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    }
  };



  // EDIT
  const handleEditBook = (id: number) => {
    const book = books.find(b => b.id === id);
    if (book) setEditingBook(book);
  };

  const handleSaveBook = async (updatedBook: Book) => {
    try {
      const saved = await updateBook(updatedBook);
      setBooks(prev =>
        prev.map(book => (book.id === saved.id ? saved : book))
      );
      setEditingBook(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update book");
    }
  };


  // DELETE
  const handleDeleteBook = (id: number) => {
    if (!confirm("Delete this book?")) return;
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Books</h2>

        {currentUserRole === "ADMIN" && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Book
          </button>
        )}
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by book, author, category, publisher"
        className="mb-4 w-full p-3 border rounded"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <select
          className="p-3 border rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="p-3 border rounded"
          value={publisher}
          onChange={e => setPublisher(e.target.value)}
        >
          <option value="">All Publishers</option>
          {publishers.map(pub => (
            <option key={pub} value={pub}>{pub}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <BookTable
        books={filteredBooks}
        currentUser={currentUser}
        currentUserRole={currentUserRole}
        onBorrowToggle={handleBorrowToggle}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
      />

      {/* ADD MODAL */}
      {isAddModalOpen && (
        <AddBookModal
          onSave={handleAddBook}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {/* EDIT MODAL */}
      {editingBook && (
        <EditBookModal
          book={editingBook}
          onSave={handleSaveBook}
          onClose={() => setEditingBook(null)}
        />
      )}
    </div>
  );
}
