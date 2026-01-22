"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold">Library System</h1>

        <Link href="/">Dashboard</Link>
        <Link href="/books">Books</Link>

        {/* ✅ USERS ONLY FOR ADMIN */}
        {user?.role === "ADMIN" && (
          <Link href="/users">Users</Link>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className="bg-blue-500 px-3 py-1 rounded text-sm">
          {user?.role}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
