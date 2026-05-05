import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    expiryDate: "",
    supplier: ""
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

  // 🔥 DELETE
  const deleteMedicine = async (id) => {
    if (!confirm("Delete this medicine?")) return;

    try {
      await API.delete(`/medicines/${id}`);
      fetchMedicines();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 EDIT
  const handleEdit = (medicine) => {
    setForm({
      ...medicine,
      expiryDate: medicine.expiryDate?.slice(0, 10)
    });
    setEditId(medicine._id);
    setShowForm(true);
  };

  // 🔥 SUBMIT (ADD + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/medicines/${editId}`, form);
      } else {
        await API.post("/medicines", form);
      }

      // reset
      setShowForm(false);
      setEditId(null);
      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
        expiryDate: "",
        supplier: ""
      });

      fetchMedicines();
    } catch (err) {
      alert("Error saving medicine");
    }
  };

  // 🔥 SEARCH
  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Medicines
      </h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => {
          setShowForm(true);
          setEditId(null);
        }}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Medicine
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-96 shadow"
          >
            <h2 className="text-lg font-bold mb-4">
              {editId ? "Edit Medicine" : "Add Medicine"}
            </h2>

            <input
              className="input"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <input
              type="number"
              className="input"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <input
              type="number"
              className="input"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
            />

            <input
              type="date"
              className="input"
              value={form.expiryDate}
              onChange={(e) =>
                setForm({ ...form, expiryDate: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Supplier"
              value={form.supplier}
              onChange={(e) =>
                setForm({ ...form, supplier: e.target.value })
              }
            />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search medicine..."
        className="mb-4 p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Expiry</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((m) => (
              <tr key={m._id} className="border-t">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.category}</td>
                <td className="p-3">₹{m.price}</td>
                <td className="p-3">{m.quantity}</td>
                <td className="p-3">
                  {m.expiryDate?.slice(0, 10)}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMedicine(m._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No medicines found
          </p>
        )}
      </div>
    </Layout>
  );
}

export default Medicines;