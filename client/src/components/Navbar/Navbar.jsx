import React, { useState } from "react";
import { Link } from "react-router-dom";
import mic from "../../assets/mic.png";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [mobileNav, setMobileNav] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "All Podcasts", path: "/all-podcasts" },
  ];

  return (
    <nav className="px-4 md:px-8 lg:px-12 py-2 relative">
      <div className="flex items-center justify-between">
        <div className="logo brand-name w-2/6 flex items-center gap-4">
          <img src={mic} alt="mic" className="h-12" />
          <Link to="/" className="text-2xl font-bold">
            Podcaster
          </Link>
        </div>
        <div className="hidden w-2/6 lg:flex items-center justify-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="ms-4 hover:font-semibold transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden w-2/6 lg:flex items-center justify-end">
          {!isLoggedIn ? (
            <>
              <Link
                className="px-6 py-3 border border-black rounded-full"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="ms-4 px-6 py-3 bg-black text-white rounded-full"
                to="/signup"
              >
                Signup
              </Link>
            </>
          ) : (
            <Link
              className="ms-4 px-6 py-3 bg-black text-white rounded-full"
              to="/profile"
            >
              Profile
            </Link>
          )}
        </div>
        <div className="w-4/6 flex items-center justify-end lg:hidden z-[1000]">
          <button
            className={`text-4xl ${
              mobileNav ? "rotate-360" : "rotate-180"
            } transition-all duration-300`}
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? <RxCross2 /> : <IoReorderThreeOutline />}
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-blue-100 ${
          mobileNav ? "translate-y-[0%]" : "translate-y-[-100%]"
        } transition-all duration-500`}
      >
        <div className="h-full flex flex-col items-center justify-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <Link
              className="ms-4 px-6 py-3 bg-black text-white rounded-full"
              to="/profile"
            >
              Profile
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
