"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    // 🔥 wait until auth is restored
    if (loading) return;

    if (!user && !isLoginPage) {
      router.replace("/login"); // replace, not push
    }
  }, [user, loading, isLoginPage, router]);

  if (loading) return null; // or spinner

  return (
    <>
      {!isLoginPage && <Navbar />}
      {children}
    </>
  );
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
