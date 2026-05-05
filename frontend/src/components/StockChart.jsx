import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function StockChart({ total, low, out }) {
  const data = [
    { name: "Normal", value: total - low - out },
    { name: "Low Stock", value: low },
    { name: "Out of Stock", value: out }
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Stock Overview</h2>

      <PieChart width={300} height={250}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default StockChart;