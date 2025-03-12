import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
        role,
      });

      console.log("API Response:", response.data); // Debugging

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/hoddash");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      setErrorMessage("Invalid Credentials. Please try again.");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://www.nicepng.com/png/full/26-266973_image-page-transparent-background-oasis-skin-1-png.png")',
      }}
    >
      <div className="wrapper bg-black bg-opacity-20 p-8 rounded-3xl shadow-lg backdrop-blur-lg w-[400px] h-[400px] max-w-[90%] max-h-[90vh]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl text-white text-center uppercase mb-6 font-Poppins">
            HOD Login
          </h1>

          {/* Username Field */}
          <div className="relative mb-6">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="font-Poppins peer w-full py-2 px-3 bg-transparent border-b-2 border-gray-300 text-white placeholder-transparent focus:outline-none focus:border-white"
            />
            <label
              htmlFor="username"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:transform-none peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-white"
            >
              Enter Your Username
            </label>
          </div>

          {/* Password Field */}
          <div className="relative mb-6">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="font-Poppins peer w-full py-2 px-3 bg-transparent border-b-2 border-gray-300 text-white placeholder-transparent focus:outline-none focus:border-white"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:transform-none peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-white"
            >
              Enter Your Password
            </label>
          </div>

          {errorMessage && (
            <div className="text-red-500 font-semibold italic mb-4">
              {errorMessage}
            </div>
          )}

          {/* Show Password Checkbox */}
          <div className="flex items-center mb-8 text-white">
            <input
              type="checkbox"
              checked={passwordVisible}
              onChange={() => setPasswordVisible(!passwordVisible)}
              id="showPasswordCheckbox"
              className="mr-2 accent-white"
            />
            <label htmlFor="showPasswordCheckbox" className="font-italic text-sm">
              Show Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
