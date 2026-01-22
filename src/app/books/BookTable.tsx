import { Book } from "@/types/book";

type Props = {
  books: Book[];
  onBorrowToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  currentUser: string;
  currentUserRole: "ADMIN" | "USER";
};


export default function BookTable({
  books,
  onBorrowToggle,
  onEdit,
  onDelete,
  currentUser,
  currentUserRole,
}: Props) {
  return (
    <table className="w-full border border-gray-200 bg-white rounded">
      {/* TABLE HEADER */}
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Book</th>
          <th className="p-3 text-left">Author</th>
          <th className="p-3 text-left">Publisher</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Action</th>

          {currentUserRole === "ADMIN" && (
            <>
              <th className="p-3 text-left">Edit</th>
              <th className="p-3 text-left">Delete</th>
            </>
          )}
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody>
        {books.map((book) => (
          <tr key={book.id} className="border-t">
            <td className="p-3">{book.name}</td>
            <td className="p-3">{book.author}</td>
              <td className="p-3">{book.publisher}</td>
            <td className="p-3">{book.category}</td>

            {/* STATUS */}
            <td className="p-3">
              {book.borrowedBy ? (
                <span className="text-red-600 font-medium">Borrowed</span>
              ) : (
                <span className="text-green-600 font-medium">Available</span>
              )}
            </td>

            {/* ACTION */}
            <td className="p-3">
              {currentUserRole === "USER" ? (
                book.borrowedBy && book.borrowedBy !== currentUser ? (
                  <button
                    className="px-3 py-1 rounded bg-gray-400 text-white cursor-not-allowed"
                    disabled
                  >
                    Borrowed
                  </button>
                ) : (
                  <button
                    className={`px-3 py-1 rounded text-white ${book.borrowedBy
                        ? "bg-orange-500"
                        : "bg-green-600"
                      }`}
                    onClick={() => onBorrowToggle(book.id)}
                  >
                    {book.borrowedBy ? "Return" : "Borrow"}
                  </button>
                )
              ) : (
                <span className="text-gray-500 italic">Admin</span>
              )}
            </td>

            {/* ADMIN ONLY: EDIT */}
            {currentUserRole === "ADMIN" && (
              <td className="p-3">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => onEdit(book.id)}
                >
                  Edit
                </button>
              </td>
            )}

            {/* ADMIN ONLY: DELETE */}
            {currentUserRole === "ADMIN" && (
              <td className="p-3">
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => onDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
