import { useEffect, useState } from "react";
import API from "../services/api";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

function RecentActivity() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {

      const res = await API.get("/stock/history");

      setLogs(res.data.slice(0, 100));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white h-90 rounded-xl shadow overflow-y-auto">
    
<div className="sticky top-0 pt-3 px-3 bg-white z-10 border-b-2">
            <h2 className="text-lg font-semibold mb-4">
        Recent Activity
      </h2>
    </div>
      

      <div className="space-y-4">

        {logs.map((log) => (

          <div
            key={log._id}
            className="flex items-center justify-between border-b pb-2"
          >

            <div className="flex items-center gap-3">

              {/* ICON */}
              <div
                className={`p-2 rounded-full ${
                  log.type === "ADD"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {log.type === "ADD"
                  ? <FiArrowUp />
                  : <FiArrowDown />
                }
              </div>

              {/* TEXT */}
              <div>
                <p className="font-medium">
                  {log.medicineId?.name}
                </p>

                <p className="text-sm text-gray-500">
                  {log.type === "ADD"
                    ? `Added ${log.change}`
                    : `Removed ${log.change}`}
                </p>
              </div>

            </div>

            {/* DATE */}
            <p className="text-xs text-gray-400">
              {new Date(log.createdAt).toLocaleDateString()}
            </p>

          </div>
        ))}

        {logs.length === 0 && (
          <p className="text-gray-500 text-sm">
            No recent activity
          </p>
        )}

      </div>
    </div>
  );
}

export default RecentActivity;