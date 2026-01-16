"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth(); // ✅ get user
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold">Library System</h1>

        <Link href="/" className="hover:underline">
          Dashboard
        </Link>

        <Link href="/books" className="hover:underline">
          Books
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm bg-blue-500 px-3 py-1 rounded">
            {user.role} {/* ✅ ADMIN / USER */}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
