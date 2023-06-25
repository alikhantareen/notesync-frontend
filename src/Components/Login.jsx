import { Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  function login() {
    setError("");
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    if (!email || !password) {
      setError("Please provide required information.");
      return;
    }
    fetch("http://localhost:5050/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_email", data.user.email);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("user_id", data.user._id);
          navigate(`/whiteboard/${localStorage.getItem("user_id")}`);
        } else {
          setError("Username/Password invalid. Try again.");
        }
      });
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(`/whiteboard/${localStorage.getItem("user_id")}`);
    }
  }, []);
  return (
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            <div>
              <h1 class="text-2xl font-semibold flex">
                Login to get started with
                <Typography
                  variant="h4"
                  color="blue"
                  textGradient
                  className="flex-1 mx-2"
                >
                  Pinned.
                </Typography>
              </h1>
              {error ? <p className="text-red-500 text-center">{error}</p> : ""}
            </div>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="relative">
                  <input
                    autocomplete="off"
                    id="email"
                    name="email"
                    type="text"
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    for="email"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div class="relative">
                  <input
                    autocomplete="off"
                    id="password"
                    name="password"
                    type="password"
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <label
                    for="password"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div class="relative">
                  <Button onClick={login}>Login</Button>
                </div>
                <div class="relative">
                  <Typography variant="lead">
                    New user?{" "}
                    <Link to={`/signup`} className="link link-info">
                      Sign up
                    </Link>{" "}
                    instead.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
