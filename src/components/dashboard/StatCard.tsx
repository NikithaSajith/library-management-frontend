type StatCardProps = {
  title: string;
  value: number;
  bgColor: string;
};

export default function StatCard({
  title,
  value,
  bgColor,
}: StatCardProps) {
  return (
    <div className="flex items-center bg-white shadow rounded-lg overflow-hidden">
      {/* Left colored section */}
      <div className={`p-12 w-16 h-16 flex items-center justify-center ${bgColor}`}>
        <span className="text-white text-xl font-bold">
          {title.charAt(0)}
        </span>
      </div>

      {/* Right content */}
      <div className="p-4">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-gray-500 text-sm uppercase">{title}</p>
      </div>
    </div>
  );
}
