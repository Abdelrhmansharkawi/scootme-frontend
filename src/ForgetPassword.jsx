import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import mu from "../public/mu.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_URL}/api/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Reset link sent to your email.");
    } else {
      toast.error(data.message || "Something went wrong.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error.")
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="mb-8">
        <img src={mu} alt="University Logo" className="h-24 w-auto" />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Enter your Email<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold text-lg"
        >
          Reset Password
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-700">Remembered your password?</span>{" "}
          <Link to="/login" className="text-orange-500 font-medium">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
