import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInfailure,
} from "../redux/user/UserSlice";

import { useDispatch, useSelector } from "react-redux";

import { useCookies } from "react-cookie";

const SignIn = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await axios.post(
        `http://localhost:3000/api/auth/signin`,
        formData
      );
      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      alert("Login completed");
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
      dispatch(signInfailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          {loading ? `Loading...` : `Sign In`}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an Account? </p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && `Something went wrong`}</p>
    </div>
  );
};

export default SignIn;
