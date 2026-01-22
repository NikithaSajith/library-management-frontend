"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { getUsers, deleteUser, addUser, updateUser } from "@/services/userApi";
import AddUserModal from "@/components/users/AddUserModal";
import { useAuth } from "@/context/AuthContext";

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // 🔐 Only admin
  if (user?.role !== "ADMIN") {
    return <p className="p-6">Access denied</p>;
  }

  // ✅ FETCH ALL USERS ON PAGE LOAD
useEffect(() => {
  getUsers()
    .then(setUsers)
    .catch(console.error);
}, []);


  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Users</h2>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowAdd(true)}
        >
          Add User
        </button>
      </div>

      {/* USERS TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
     <tbody>
  {users.map(u => (
    <tr key={u.id}>
      <td className="border p-2">{u.username}</td>
      <td className="border p-2">{u.role}</td>
      <td className="border p-2 flex gap-2">

        {/* EDIT – only for USER */}
        {u.role !== "ADMIN" && (
          <button
            className="bg-yellow-500 px-3 py-1 text-white rounded"
            onClick={() => setEditingUser(u)}
          >
            Edit
          </button>
        )}

        {/* DELETE – only for USER */}
        {u.role !== "ADMIN" && (
          <button
            className="bg-red-500 px-3 py-1 text-white rounded"
            onClick={async () => {
              if (!u.id) return;
              if (!confirm("Delete this user?")) return;

              await deleteUser(u.id);
              setUsers(prev => prev.filter(x => x.id !== u.id));
            }}
          >
            Delete
          </button>
        )}

        {/* ADMIN LABEL */}
        {u.role === "ADMIN" && (
          <span className="text-gray-500 text-sm italic">
            Protected
          </span>
        )}

      </td>
    </tr>
  ))}
</tbody>

      </table>

      {/* ADD USER MODAL */}
      {showAdd && (
        <AddUserModal
          onClose={() => setShowAdd(false)}
          onSave={(newUser) => {
            setUsers(prev => [...prev, newUser]);
            setShowAdd(false);
          }}
        />
      )}
      {editingUser && (
  <AddUserModal
    initialUser={editingUser}
    onClose={() => setEditingUser(null)}
    onSave={async updated => {
      const saved = await updateUser(updated);
      setUsers(prev =>
        prev.map(u => (u.id === saved.id ? saved : u))
      );
    }}
  />
)}

    </div>
  );
}
