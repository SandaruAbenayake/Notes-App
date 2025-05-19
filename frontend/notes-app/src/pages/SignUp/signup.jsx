import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Inputs/PasswordInput"; 
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please Enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    // signup logic API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName:name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10 shadow-md">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7 text-center">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />

            {/* Show error */}
            {error && (
              <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
            )}

            <button type="submit" className="btn-primary mt-2">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
