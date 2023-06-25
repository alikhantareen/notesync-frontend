import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import sun from "../images/sun.png";
import moon from "../images/moon.png";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  PowerIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export default function Navbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "fantasy"
  );
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);
  const [username, setUsername] = useState(null);
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("fantasy");
    }
  };
  function logout() {
    setauthenticated(null);
    localStorage.clear();
    navigate("/");
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
      setUsername(localStorage.getItem("username").toLocaleUpperCase());
    }
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [authenticated, theme]);
  return (
    <>
      <div className="drawer z-50">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full flex justify-between navbar">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <Link to={`/whiteboard/${localStorage.getItem("user_id")}`}>
              <Typography
                variant="h3"
                color="blue"
                textGradient
                className="flex-1 mx-2"
              >
                Pinned.
              </Typography>
            </Link>
            <div className="flex justify-center items-center gap-3">
              <div className="flex-none">
                {/* Toggle button here */}
                <button className="btn btn-square btn-ghost">
                  <label className="swap swap-rotate w-12 h-12">
                    <input
                      type="checkbox"
                      onChange={handleToggle}
                      // show toggle image based on localstorage theme
                      checked={theme === "fantasy" ? false : true}
                    />
                    {/* fantasy theme sun image */}
                    <img src={sun} alt="fantasy" className="w-8 h-8 swap-on" />
                    {/* dark theme moon image */}
                    <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
                  </label>
                </button>
              </div>
              <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal">
                  <li>
                    <Button onClick={logout}>Log out</Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200">
            <div className="mb-2 p-4">
              <Typography
                variant="h4"
                color="blue"
                textGradient
                className="px-2"
              >
                Pinned.
              </Typography>
            </div>
            <List>
              <ListItem>
                <ListItemPrefix>
                  <UserIcon className="h-5 w-5" />
                </ListItemPrefix>
                {username}
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Link to={`/whiteboard/${localStorage.getItem("user_id")}`}>
                  Whiteboard
                </Link>
              </ListItem>
              <ListItem onClick={logout}>
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </List>
          </ul>
        </div>
      </div>
    </>
  );
}
