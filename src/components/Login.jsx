import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the token and redirect user to home page
      localStorage.setItem("token", json.authToken);
      navigate("/");
      alert("Logged in successfully");
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
          Login to iNoteBook
        </h2>
        <form className="space-y-8" onSubmit={handleClick}>
          <div className="text-xl">
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
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
              value={credentials.password}
              onChange={onChange}
              className="p-2 border-b-2 border-b-gray-400 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="md:text-xl">
            <button className="font-semibold bg-[#03A9F4] text-white py-2 px-5 rounded hover:bg-[#0175ab]">
              LogIn
            </button>
          </div>
          <div className="font-bold text-lg text-center">
            Not a Member?{" "}
            <Link to="/signup" className="text-[#0175ab] hover:text-[#03A9F4]">
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
