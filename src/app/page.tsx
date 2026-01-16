"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import { getBooks } from "@/services/bookApi";
import { Book } from "@/types/book";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  // ===== FETCH BOOKS FROM BACKEND =====
  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(console.error);
  }, []);

  // ===== DASHBOARD CALCULATIONS =====
  const totalBooks = books.length;

  const borrowedBooks = books.filter(
    (book) => book.borrowedBy !== null
  ).length;

  const availableBooks = books.filter(
    (book) => book.borrowedBy === null
  ).length;

  const uniqueUsers = new Set(
    books.map((book) => book.borrowedBy).filter(Boolean)
  );
  const totalUsers = uniqueUsers.size + 1; // +1 Admin

  // ===== PIE DATA =====
  const pieData = [
    { name: "Available", value: availableBooks },
    { name: "Borrowed", value: borrowedBooks },
  ];

  // ===== BAR DATA =====
  const categoryMap: Record<string, number> = {};
  books.forEach((book) => {
    categoryMap[book.category] =
      (categoryMap[book.category] || 0) + 1;
  });

  const barData = Object.keys(categoryMap).map((key) => ({
    category: key,
    count: categoryMap[key],
  }));

  const PIE_COLORS = ["#10B981", "#EF4444"]; // teal & soft red

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={totalBooks}
          bgColor="bg-indigo-500"
        />

        <StatCard
          title="Available Books"
          value={availableBooks}
          bgColor="bg-emerald-500"
        />

        <StatCard
          title="Borrowed Books"
          value={borrowedBooks}
          bgColor="bg-red-500"
        />

        <StatCard
          title="Users"
          value={totalUsers}
          bgColor="bg-purple-500"
        />
      </div>

{/* ===== DASHBOARD ANALYTICS ===== */}
<h2 className="text-xl font-semibold text-gray-700 mt-12 mb-4">
  Dashboard Analytics
</h2>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

  {/* BAR CHART – WIDER */}
  <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-8">
    <h3 className="text-lg font-bold text-gray-700 mb-4">
      Books by Category
    </h3>

   <ResponsiveContainer width="100%" height={360}>
  <BarChart
    data={barData}
    margin={{ top: 20, right: 30, left: 10, bottom: 90 }}
  >
    <XAxis
      dataKey="category"
      interval={0}
      angle={-30}
      textAnchor="end"
      tick={{ fontSize: 16 }}
    />
    <YAxis />
    <Tooltip />
    <Bar
      dataKey="count"
      fill="#6366F1"
      barSize={42}
      radius={[10, 10, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>


  </div>

  {/* PIE CHART – COMPACT */}
  <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-4 flex flex-col items-center">
    <h3 className="text-lg font-bold text-gray-700 mb-4">
      Availability Status
    </h3>

    <PieChart width={300} height={300}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={110}
      >
        {pieData.map((_, index) => (
          <Cell key={index} fill={PIE_COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>

    <div className="flex gap-6 mt-4 text-sm">
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 bg-emerald-500 rounded"></span> Available
      </span>
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 bg-red-500 rounded"></span> Borrowed
      </span>
    </div>
  </div>
</div>

    </div>
  );
}
