import { Book } from "@/types/book";
import { useState } from "react";

type Props = {
  onSave: (book: Omit<Book, "id">) => void;
  onClose: () => void;
};


export default function AddBookModal({ onSave, onClose }: Props) {
  const [formData, setFormData] = useState<Omit<Book, "id">>({
  name: "",
  author: "",
  category: "",
  publisher: "",
  borrowedBy: null,
});

  const [error, setError] = useState("");


  const handleChange = (
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

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Book Name"
        />

        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Author"
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Category"
        />

        <input
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Publisher"
        />

        <div className="flex justify-end gap-2">
          {error && (
            <p className="text-red-600 text-sm mb-2">{error}</p>
          )}
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
                !formData.author.trim() ||
                !formData.category.trim() ||
                !formData.publisher.trim()
              ) {
                setError("All fields are required");
                return;
              }

              onSave(formData);
            }}

          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
