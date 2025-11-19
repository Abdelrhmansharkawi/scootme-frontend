import React, { useState, useEffect } from "react";
import { FaHome, FaHistory } from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";


const API_URL = "";

function History() {
  const [query, setQuery] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await axios.get(`${API_URL}/api/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistoryData(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filtered = historyData.filter((item) =>
    item.scooterId?.scooterName?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-orange-200 to-transparent p-4">
        <h1 className="text-center text-xl font-semibold text-gray-700 flex items-center justify-center">
          <FaHistory className="mr-2" /> History
        </h1>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder="Search for a Specific Scooter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-3/4 max-w-md px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto mt-2 px-4">
        {loading ? (
  <div className="text-center text-gray-500 py-10">Loading history...</div>
) : (
        <ul className="space-y-2">
          {filtered.map((item) => (
            <li
              key={item._id}
              className="bg-white flex items-center justify-between p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <MdElectricScooter className="text-2xl text-gray-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-800">{item.scooterId?.scooterName || "Unknown Scooter"}</p>
                  <p className="text-sm text-gray-500">From {item.startLocation?.startLocationName || "Unknown"} to {item.endLocation?.endLocationName || "Unknown"}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400"> {new Date(item.startTime).toLocaleString()}</span>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-center text-gray-500 py-4">
              No results found.
            </li>
          )}
        </ul>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 p-2 flex justify-around items-center">
        <button className="flex flex-col items-center text-gray-500">
            <FaHome className="text-xl" />
          <span className="text-xs">Home</span>
        </button>
        <Link to="/book-ride" className="flex flex-col items-center text-gray-500">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="p-3 bg-white rounded-full shadow-lg"
        >
          <MdElectricScooter className="text-4xl text-gray-500 hover:scale-110 transition-transform" />
        </motion.div>
      </Link>
        <button className="flex flex-col items-center text-orange-500">
          <FaHistory className="text-xl" />
          <span className="text-xs">History</span>
        </button>
      </nav>
    </div>
  );
}

export default History;
