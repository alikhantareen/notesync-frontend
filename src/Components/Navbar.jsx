import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import { PresentationChartBarIcon, PowerIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);
  const [id, profileID] = useState(null);
  function logout() {
    setauthenticated(null);
    localStorage.clear();
    navigate("/");
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
      profileID(localStorage.getItem("user_id"));
    }
  }, [authenticated]);
  return (
    <>
      <div className="drawer z-50">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar">
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
            <Typography
              variant="h3"
              color="blue"
              textGradient
              className="flex-1 mx-2"
            >
              Pinned.
            </Typography>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                <li>
                  <Button onClick={logout}>Log out</Button>
                </li>
              </ul>
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
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
              <ListItem>
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
