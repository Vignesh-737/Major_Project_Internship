import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import StockChart from "../components/StockChart";

function Dashboard() {
  const [Total, setTotal] = useState(0);
  const [LowStock, setLowStock] = useState(0);
  const [OutofStock, setOutofStock] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const medicines = await API.get("/medicines");
      setTotal(medicines.data.length);

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
        <Card title="Low Stock" value={LowStock} color="yellow" />
        <Card title="Out of Stock" value={OutofStock} color="red" />
      </div>

      <StockChart total={Total} low={LowStock} out={OutofStock} />
    </Layout>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold text-${color}-500`}>
        {value}
      </h2>
    </div>
  );
}

export default Dashboard;