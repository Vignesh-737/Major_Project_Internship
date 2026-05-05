import { NavLink } from "react-router-dom";
import { FiHome, FiBox, FiActivity, FiUser } from "react-icons/fi";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      <h1 className="text-2xl font-bold text-green-600 mb-8">
        PharmaStock
      </h1>

      <nav className="flex flex-col gap-4">
        <NavLink to="/dashboard" className="flex justify-start items-center gap-2 p-2 hover:bg-green-100 rounded">
          <FiHome /> Dashboard
        </NavLink>

        <NavLink to="/medicines" className="flex justify-start items-center gap-2 p-2 hover:bg-green-100 rounded">
          <FiBox /> Medicines
        </NavLink>

        <NavLink to="/stock" className="flex justify-start items-center gap-2 p-2 hover:bg-green-100 rounded">
          <FiActivity /> Stock
        </NavLink>

        <NavLink to="/profile" className="flex justify-start items-center gap-2 p-2 hover:bg-green-100 rounded">
          <FiUser /> Profile
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;