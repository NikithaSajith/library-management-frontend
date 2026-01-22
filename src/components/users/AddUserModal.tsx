"use client";

import { User } from "@/types/user";
import { useState } from "react";

type Props = {
  initialUser?: User | null;
  onSave: (user: User) => void | Promise<void>;
  onClose: () => void;
};

export default function AddUserModal({
  initialUser,
  onSave,
  onClose,
}: Props) {
  const [formData, setFormData] = useState<User>({
    id: initialUser?.id,               // ✅ optional
    username: initialUser?.username ?? "",
    password: "",
    role: initialUser?.role ?? "USER",
  });

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return;
    }

    // 🔐 password required ONLY when adding
    if (!initialUser && !formData.password?.trim()) {
      setError("Password is required");
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-xl font-bold mb-4">
          {initialUser ? "Edit User" : "Add User"}
        </h3>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Username"
          value={formData.username}
          onChange={e =>
            setFormData({ ...formData, username: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder={
            initialUser ? "New password (optional)" : "Password"
          }
          value={formData.password}
          onChange={e =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
