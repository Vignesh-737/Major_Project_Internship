import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { FiUser, FiMail, FiHash, FiShield } from "react-icons/fi";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <Layout>
        <p className="text-center mt-10">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Profile
      </h1>

      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">

          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-3 text-lg font-semibold">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-3 border p-3 rounded-lg">
              <FiMail className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border p-3 rounded-lg">
              <FiHash className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium">{user.employeeId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border p-3 rounded-lg">
              <FiShield className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
            </div>

          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;