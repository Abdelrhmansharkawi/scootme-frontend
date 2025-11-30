import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentIdImage, setStudentIdImage] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setUploadStatus("");

    if (!firstName || !lastName || !email || !password) {
      return setError("Please fill in all required fields.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("Please enter a valid email address.");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!agreed) {
      return setError("Please agree to the Terms of Service.");
    }

    try {
      setLoading(true);

      // 1. Register the user
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      const token = res.data.data.token;

      // 2. Upload image if exists
      if (studentIdImage) {
        const formData = new FormData();
        formData.append("image", studentIdImage);

        await axios.post(`${API_URL}/api/pyqr/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setUploadStatus("Student ID verified and saved.");
      }

      window.location.replace("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <img src="/mu.svg" alt="University Logo" className="h-24 w-auto" />
      </div>

      <form
        onSubmit={handleSignup}
        className="flex flex-col items-center justify-start flex-grow w-full mx-auto px-4 space-y-6">
        <div className="w-[70%]">
          <label className="block mb-1 font-semibold text-gray-700">
            Enter your name<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        <div className="w-[70%]">
          <label className="block mb-1 font-semibold text-gray-700">
            Enter your email<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="w-[70%]">
          <label className="block mb-1 font-semibold text-gray-700">
            Enter your password<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="w-[70%]">
          <label className="block mb-1 font-semibold text-gray-700">
            Confirm password<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/*  Image Upload Field */}
        <div className="w-[70%]">
          <label className="block mb-1 font-semibold text-gray-700">
            Upload Student ID{" "}
            <span className="text-sm text-gray-500">(Optional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setStudentIdImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4"
            onChange={(e) => setAgreed(e.target.checked)}
            checked={agreed}
          />
          <span className="ml-2 text-gray-700">
            I agree to the
            <Link to="/terms" className="text-orange-500 ml-1">
              Terms of Service
            </Link>
          </span>
        </div>

        {error && <span className="text-red-500">{error}</span>}
        {uploadStatus && (
          <span className="text-green-600 font-semibold">{uploadStatus}</span>
        )}

        <div className="bg-orange-500 py-3 text-center w-[75%] rounded-full mb-3">
          <button
            type="submit"
            disabled={loading}
            className={`text-white font-semibold text-lg w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>
      </form>

      <div className="text-center mb-4">
        <span className="text-gray-700">Already have an account?</span>{" "}
        <Link to="/login" className="text-orange-500">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
