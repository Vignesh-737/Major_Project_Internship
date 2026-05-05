import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");

  // 🔥 Dynamic page title
  const getTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("medicines")) return "Medicines";
    if (location.pathname.includes("stock")) return "Stock";
    if (location.pathname.includes("profile")) return "Profile";
    return "PharmaStock";
  };

  // 🔥 Search redirect
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/medicines?search=${search}`);
    }
  };

  return (
    <div className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">

      {/* LEFT: TITLE */}
      <h2 className="text-lg font-semibold text-gray-700">
        {getTitle()}
      </h2>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* 🔍 SEARCH */}
        <div className="flex items-center border rounded-lg px-2">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="p-1 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* 🔔 NOTIFICATION (basic for now) */}
        <div
          className="relative cursor-pointer"
          title="Low stock alerts"
        >
          <FiBell className="text-xl text-gray-600" />
          {/* fake badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            !
          </span>
        </div>

        {/* 👤 PROFILE */}
        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer flex items-center gap-1"
        >
          <FiUser className="text-xl text-gray-600" />
        </div>

        {/* 🔴 LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;