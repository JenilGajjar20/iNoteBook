import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

function TopNavbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <div className="bg-gradient-to-r from-[#3F51B5] via-[#03A9F4] to-[#009688] flex justify-evenly items-center py-4 px-2 text-white">
        <div className="font-bold text-2xl font-mono">
          <Link to="/">
            iNoteBook<span className="ml-2">📝</span>
          </Link>
        </div>
        <div className="hidden sm:block">
          <ul className="flex space-x-10 items-center font-semibold md:text-xl">
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "border-b-2 border-b-white text-white"
                    : "text-white"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`${
                  location.pathname === "/about"
                    ? "border-b-2 border-b-white text-white"
                    : "text-white"
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden sm:block">
          {!localStorage.getItem("token") ? (
            <div className="ring-2 ring-white text-white py-1 px-3 rounded hover:ring-[#3F51B5] transition-all duration-200">
              <Link to="/login">Login</Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="ring-2 ring-white text-white py-1 px-3 rounded hover:ring-[#3F51B5] transition-all duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
