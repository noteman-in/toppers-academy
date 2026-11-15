"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function AdminPageViewsChart({ data }: { data: any[] }) {
  // 1. Group the raw data
  const groupedData: Record<string, number> = {};

  data.forEach((item) => {
    let category = item.path;
    const views = item._count.path;

    // Map URLs to friendly names and group dynamic routes
    if (category === "/") {
      category = "Homepage";
    } else if (category.startsWith("/test-series")) {
      category = "Test Series"; // Groups both /test-series and /test-series/[id]
    } else if (category.startsWith("/courses")) {
      category = "Courses";     // Groups both /courses and /courses/[slug]
    } else if (category === "/free-resources") {
      category = "Free Resources";
    } else if (category === "/contact") {
      category = "Contact";
    } else if (category.startsWith("/blog")) {
      category = "Blog";
    } else if (category === "/testimonials") {
      category = "Testimonials";
    } else if (category === "/about") {
      category = "About";
    }

    // Add the views to the category
    if (groupedData[category]) {
      groupedData[category] += views;
    } else {
      groupedData[category] = views;
    }
  });

  // 2. Convert back to an array and sort highest to lowest
  const chartData = Object.entries(groupedData)
    .map(([name, views]) => ({ name, views }))
    .sort((a, b) => b.views - a.views);

  return (
    <div className="h-[350px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748B", fontSize: 12, fontWeight: 600 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748B", fontSize: 12 }} 
            allowDecimals={false}
          />
          <Tooltip 
            cursor={{ fill: "#F1F5F9" }} 
            contentStyle={{ 
              borderRadius: "12px", 
              border: "none", 
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              fontWeight: "bold",
              color: "#0F172A"
            }} 
          />
          <Bar 
            dataKey="views" 
            fill="#3B82F6" 
            radius={[6, 6, 0, 0]} 
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}