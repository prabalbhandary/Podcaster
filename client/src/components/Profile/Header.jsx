import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/Auth/auth";

const Header = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "https://podcaster-server.vercel.app/api/v1/users/user-details",
          { withCredentials: true }
        );
        if (response.data) {
          setUserData(response.data.existingUser);
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchUserDetails();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://podcaster-server.vercel.app/api/v1/users/logout",
        { withCredentials: true }
      );
      if (response.data) {
        dispatch(authActions.logout());
        navigate("/")
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {userData && (
        <div className="bg-green-900 rounded py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-zinc-300">Profile</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center">
              {userData.username}
            </h1>
            <p className="text-zinc-300 mt-1">{userData.email}</p>
          </div>
          <div className="">
            <button
              onClick={handleLogout}
              className="bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
