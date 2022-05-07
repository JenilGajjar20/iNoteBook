import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

function BottomNavbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <div className="fixed bg-gradient-to-r from-[#3F51B5] via-[#03A9F4] to-[#009688] bottom-0 left-0 right-0 py-3 px-4 rounded-tl-md rounded-tr-md sm:hidden">
        <ul className="flex justify-evenly items-center font-semibold">
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
          <li>
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
          </li>
        </ul>
      </div>
    </header>
  );
}

export default BottomNavbar;
