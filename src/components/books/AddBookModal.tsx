"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { Author } from "@/types/author";
import { Publisher } from "@/types/publisher";

import { getAuthors, addAuthor } from "@/services/authorApi";
import { getPublishers, addPublisher } from "@/services/publisherApi";

type Props = {
  onSave: (book: Omit<Book, "id">) => void;
  onClose: () => void;
};

export default function AddBookModal({ onSave, onClose }: Props) {
  /* ================= BOOK FORM ================= */
  const [formData, setFormData] = useState<Omit<Book, "id">>({
    name: "",
    author: "",
    category: "",
    publisher: "",
    borrowedBy: null,
  });

  /* ================= AUTHORS & PUBLISHERS ================= */
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  /* ================= INLINE ADD STATES ================= */
  const [showAuthorInput, setShowAuthorInput] = useState(false);
  const [showPublisherInput, setShowPublisherInput] = useState(false);

  const [newAuthor, setNewAuthor] = useState("");
  const [newPublisher, setNewPublisher] = useState("");

  const [error, setError] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    getAuthors().then(setAuthors);
    getPublishers().then(setPublishers);
  }, []);

  /* ================= HANDLERS ================= */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">

        <h3 className="text-xl font-bold mb-4">Add Book</h3>

        {/* BOOK NAME */}
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Book Name"
        />

        {/* CATEGORY */}
        <input
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Category"
        />

        {/* AUTHOR DROPDOWN */}
        <select
          value={formData.author}
          onChange={(e) =>
            setFormData({ ...formData, author: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="">Select Author</option>
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>

        <button
          className="text-sm text-blue-600 mb-3"
          onClick={() => setShowAuthorInput(true)}
        >
          + Add Author
        </button>

        {/* ADD AUTHOR INLINE */}
        {showAuthorInput && (
          <div className="flex gap-2 mb-3">
            <input
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="New Author Name"
              className="flex-1 p-2 border rounded"
            />
            <button
              className="bg-green-600 text-white px-3 rounded"
              onClick={async () => {
                if (!newAuthor.trim()) return;

                await addAuthor(newAuthor);
                setAuthors(await getAuthors());

                setNewAuthor("");
                setShowAuthorInput(false);
              }}
            >
              Add
            </button>
          </div>
        )}

        {/* PUBLISHER DROPDOWN */}
        <select
          value={formData.publisher}
          onChange={(e) =>
            setFormData({ ...formData, publisher: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="">Select Publisher</option>
          {publishers.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          className="text-sm text-blue-600 mb-3"
          onClick={() => setShowPublisherInput(true)}
        >
          + Add Publisher
        </button>

        {/* ADD PUBLISHER INLINE */}
        {showPublisherInput && (
          <div className="flex gap-2 mb-3">
            <input
              value={newPublisher}
              onChange={(e) => setNewPublisher(e.target.value)}
              placeholder="New Publisher Name"
              className="flex-1 p-2 border rounded"
            />
            <button
              className="bg-green-600 text-white px-3 rounded"
              onClick={async () => {
                if (!newPublisher.trim()) return;

                await addPublisher(newPublisher);
                setPublishers(await getPublishers());

                setNewPublisher("");
                setShowPublisherInput(false);
              }}
            >
              Add
            </button>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => {
              if (
                !formData.name.trim() ||
                !formData.category.trim() ||
                !formData.author ||
                !formData.publisher
              ) {
                setError("All fields are required");
                return;
              }

              onSave(formData);
            }}
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}
