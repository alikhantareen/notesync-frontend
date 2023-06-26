import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  function signup() {
    setError(null);
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let username = document.querySelector("#username").value;

    if (!email || !password || !username) {
      setError("Please provide required information.");
      return;
    }

    fetch("http://localhost:5050/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User already registered.") {
          setError("User already registered");
          return;
        }
        if (data.message === "Username already taken.") {
          setError("Username already taken.");
          return;
        }
        if (data.message === "Please Provide Required Information.") {
          setError("Please Provide Required Information.");
          return;
        }
        if (data.message === "User created Successfully.") {
          signIn(email, password);
        }
      });
  }
  function signIn(email, pass) {
    fetch("http://localhost:5050/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pass }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User does not exist..!") {
          setError("User does not exist..!");
          return;
        }
        if (data.message === "Something went wrong!") {
          setError("Something went wrong!");
          return;
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_email", data.user.email);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("user_id", data.user._id);
          navigate(`/whiteboard/${localStorage.getItem("user_id")}`);
        }
      });
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
        navigate(`/whiteboard/${localStorage.getItem("user_id")}`);
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold flex">
                Sign up to get started with
                <Typography
                  variant="h4"
                  color="blue"
                  textGradient
                  className="flex-1 mx-2"
                >
                  NoteSync.
                </Typography>
              </h1>
            </div>
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              ""
            )}
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="username"
                    name="username"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Username"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Username
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Button onClick={signup}>Sign up</Button>
                </div>
                <div className="relative">
                  <Typography variant="lead">
                    Already registered?{" "}
                    <Link to={`/`} className="link link-info">
                      Log in
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
