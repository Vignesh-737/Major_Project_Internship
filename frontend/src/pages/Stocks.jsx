import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function Stock() {
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("ADD");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchMedicines();
    fetchLogs();
  }, []);

  // 🔥 GET MEDICINES
  const fetchMedicines = async () => {
    const res = await API.get("/medicines");
    setMedicines(res.data);
  };

  // 🔥 GET STOCK HISTORY
  const fetchLogs = async () => {
    const res = await API.get("/stock/history");
    setLogs(res.data);
  };

  // 🔥 UPDATE STOCK
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selected || !quantity) {
      alert("Fill all fields");
      return;
    }

    try {
      await API.put(`/stock/${selected}`, {
        quantity: Number(quantity),
        type
      });

      alert("Stock updated");
      setQuantity("");
      fetchMedicines();
      fetchLogs();

    } catch (err) {
      alert(err.response?.data?.error || "Error updating stock");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Stock Management
      </h1>

      {/* 🔥 FORM */}
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >
        <h2 className="text-lg font-semibold mb-4">
          Update Stock
        </h2>

        {/* SELECT MEDICINE */}
        <select
          className="input"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select Medicine</option>
          {medicines.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name} (Qty: {m.quantity})
            </option>
          ))}
        </select>

        {/* TYPE */}
        <select
          className="input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="ADD">Add Stock</option>
          <option value="REMOVE">Remove Stock</option>
        </select>

        {/* QUANTITY */}
        <input
          type="number"
          placeholder="Quantity"
          className="input"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">
          Update
        </button>
      </form>

      {/* 🔥 STOCK HISTORY */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <h2 className="p-4 font-semibold">Stock History</h2>

        <table className="w-full">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3">Medicine</th>
              <th>Type</th>
              <th>Change</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t">
                <td className="p-3">
                  {log.medicineId?.name}
                </td>

                <td
                  className={`${
                    log.type === "ADD"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {log.type}
                </td>

                <td>{log.change}</td>
                <td>{log.updatedBy?.name}</td>

                <td>
                  {new Date(log.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No stock activity yet
          </p>
        )}
      </div>
    </Layout>
  );
}

export default Stock;