import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { FiSearch, FiTrash2 } from "react-icons/fi";

function Medicines() {

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 USER
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  // 🔥 FORM
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    supplier: "",
    expiryDate: ""
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  // 🔥 FETCH
  const fetchMedicines = async () => {
    try {

      const res = await API.get("/medicines");

      setMedicines(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 ADD
  const addMedicine = async (e) => {
    e.preventDefault();

    try {

      await API.post("/medicines", form);

      fetchMedicines();

      setForm({
        name: "",
        category: "",
        price: "",
        supplier: "",
        quantity:""||0,
        expiryDate: ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE
  const deleteMedicine = async (id) => {
    try {

      await API.delete(`/medicines/${id}`);

      fetchMedicines();

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 SEARCH
  const filteredMedicines = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold text-green-700">
          Medicines
        </h1>

        {/* SEARCH */}
        <div className="flex items-center bg-white px-3 py-2 rounded-xl shadow w-72">

          <FiSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search medicine..."
            className="ml-2 w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* 🔥 ADMIN FORM */}
      {isAdmin ? (

        <div className="bg-white p-6 rounded-2xl shadow mb-6">

          <h2 className="text-lg font-semibold mb-4">
            Add Medicine
          </h2>

          <form
            onSubmit={addMedicine}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              placeholder="Medicine Name"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-300"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Category"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-300"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-300"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Supplier"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-300"
              value={form.supplier}
              onChange={(e) =>
                setForm({ ...form, supplier: e.target.value })
              }
            />

            <input
              type="date"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-300"
              value={form.expiryDate}
              onChange={(e) =>
                setForm({ ...form, expiryDate: e.target.value })
              }
            />

            <button
              className="bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Add Medicine
            </button>

          </form>

        </div>

      ) : (

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-xl mb-6">
          Only administrators can add or modify medicines.
        </div>

      )}

      {/* 🔥 MEDICINE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredMedicines.map((m) => (

          <div
            key={m._id}
            className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
          >

            {/* TOP */}
            <div className="flex justify-between items-start">

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {m.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {m.category}
                </p>
              </div>

              {/* STOCK STATUS */}
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  m.quantity === 0
                    ? "bg-red-100 text-red-600"
                    : m.quantity <= 10
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {m.quantity === 0
                  ? "Out"
                  : m.quantity <= 10
                  ? "Low"
                  : "In Stock"}
              </div>

            </div>

            {/* DETAILS */}
            <div className="mt-5 space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Price
                </span>

                <span className="font-semibold">
                  ₹{m.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Supplier
                </span>

                <span className="font-semibold">
                  {m.supplier || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Expiry
                </span>

                <span className="font-semibold">
                  {m.expiryDate
                    ? new Date(m.expiryDate)
                        .toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

            </div>

            {/* ACTIONS */}
            {isAdmin && (

              <div className="mt-5 flex gap-2">

                <button
                  onClick={() => deleteMedicine(m._id)}
                  className="flex items-center justify-center gap-2 bg-red-500 text-white w-full py-2 rounded-xl hover:bg-red-600 transition"
                >
                  <FiTrash2 />
                  Delete
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </Layout>
  );
}

export default Medicines;