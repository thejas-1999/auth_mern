import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected typo

    try {
      setLoading(true);
      setError(false);
      const res = await axios.post(
        `http://localhost:3000/api/auth/signup`,
        formData
      );

      alert("Registration completed");
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      alert("Registration failed");
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username..."
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email..."
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password..."
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? `Loading...` : `Sign UP`}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account? </p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && `Something went wrong`}</p>
    </div>
  );
};

export default SignUp;
