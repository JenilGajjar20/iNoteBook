import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Redirect the user to login page
      localStorage.setItem("token", json.authToken);
      navigate("/login");
      alert("Account created successfully");
    } else {
      alert("Invalid Credentials!!");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold pb-8">
          SignUp to iNoteBook
        </h2>
        <form className="space-y-8" onSubmit={handleClick}>
          <div className="text-xl">
            <input
              type="text"
              id="name"
              name="name"
              onChange={onChange}
              className="p-2 border-b-2 border-b-gray-400 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="text-xl">
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              className="p-2 border-b-2 border-b-gray-400 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="text-xl">
            <input
              type="password"
              id="password"
              name="password"
              onChange={onChange}
              minLength={5}
              className="p-2 border-b-2 border-b-gray-400 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="text-xl">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={onChange}
              minLength={5}
              className="p-2 border-b-2 border-b-gray-400 focus:outline-none"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="md:text-xl">
            <button className="font-semibold bg-[#03A9F4] text-white py-2 px-5 rounded hover:bg-[#0175ab]">
              SignUp
            </button>
          </div>
          <div className="font-bold text-lg text-center">
            Already a Member?{" "}
            <Link to="/login" className="text-[#0175ab] hover:text-[#03A9F4]">
              LogIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
