import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/Auth/auth";
import ErrorPage from "./ErrorPage";

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const changeFunc = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        values,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      dispatch(authActions.login());
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <ErrorPage />
      ) : (
        <div className="h-screen bg-green-100 flex items-center justify-center">
          <div className="w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center">
            <Link to="/" className="text-2xl font-bold">
              Login
            </Link>
            <div className="mt-6 w-full">
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={changeFunc}
                  type="email"
                  className="mt-2 px-2 py-2 rounded outline-none border border-black"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={changeFunc}
                  type="password"
                  className="mt-2 px-2 py-2 rounded outline-none border border-black"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div className="w-full flex flex-col mt-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-green-900 font-semibold text-xl text-white rounded py-2"
                >
                  Login
                </button>
              </div>
              <div className="w-full flex flex-col mt-4">
                <p className="text-center">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="hover:text-blue-600 font-semibold"
                  >
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
