import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import StockChart from "../components/StockChart";
import RecentActivity from "../components/RecentActivity";

function Dashboard() {
  const [Total, setTotal] = useState(0);
  const [LowStock, setLowStock] = useState(0);
  const [OutofStock, setOutofStock] = useState(0);
  const [ExpiryingSoon, setExpiryingSoon] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const medicines = await API.get("/medicines");
      setTotal(medicines.data.length);

      const expiry = await API.get("/medicines/expiring-soon");
      setExpiryingSoon(expiry.data.length);

      const low = await API.get("/medicines/low-stock");
      setLowStock(low.data.length);

      const os = await API.get("/medicines/outofstock");
      setOutofStock(os.data.length || 0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Total Medicines" value={Total} color="green" />
        <Card title="Low Stock" value={LowStock} color="blue" />
        <Card title="Expiring Soon" value={ExpiryingSoon} color="orange" />
        <Card title="Out of Stock" value={OutofStock} color="red" />
      </div>

<div className="grid grid-cols-2 gap-4 mt-4">

  <StockChart
    total={Total}
    low={LowStock}
    out={OutofStock}
    expiring={ExpiryingSoon}
  />

  <RecentActivity />

</div>    </Layout>
  );
}

function Card({ title, value, color }) {
    const colors = {
    green: "text-green-500",
    blue: "text-blue-500",
    red: "text-red-500",
    orange: "text-orange-500"
  };
  const borderColors = {
  green: "border-green-500",
  blue: "border-blue-500",
  red: "border-red-500",
  orange: "border-orange-500"
};
  return (
    <div className={`bg-white p-4 rounded-xl shadow border-t-4 ${borderColors[color]}`}>
      <p className="text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold ${colors[color]}`}>
        {value}
      </h2>
    </div>
  );
}

export default Dashboard;