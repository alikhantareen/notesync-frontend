import { Fragment, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FolderIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

function WhiteBoard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [folderModalopen, setFolderModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [folderCreated, setFolderCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  function fetchFolders(id) {
    fetch(`http://localhost:5050/whiteboard/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
        setLoading(false);
      });
  }
  function createFolder(id) {
    setFolderCreated(false);
    setError("");
    const title = document.querySelector("#folderName").value;
    if (!title) {
      setError("Please provide folder name.");
      return;
    }
    fetch(`http://localhost:5050/whiteboard/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: localStorage.getItem("user_id"),
        title: title,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFolderCreated(true);
        setFolderModal(!folderModalopen);
      });
  }
  const handleOpen = () => {
    setError("");
    setFolderModal(!folderModalopen);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    fetchFolders(id);
  }, [folderCreated]);
  return (
    <main>
      <Navbar />
      <section className="w-full">
        <section className="w-full">
          <div className="w-full p-4 flex justify-between">
            <Typography variant="h2" color="blue">
              Whiteboard
            </Typography>
          </div>
        </section>
        <section className="p-4 flex flex-col md:flex-row md:items-center gap-6 md:gap-4">
          <div
            onClick={handleOpen}
            className="border-2 border-fuchsia-900 w-full md:w-20 h-16 rounded-lg shadow-lg flex justify-center items-center cursor-pointer"
          >
            <p className="text-md font-medium flex justify-center items-center gap-4">
              <PlusIcon className="h-6 w-6 font-bold"></PlusIcon>
            </p>
            <p></p>
          </div>
          <div className="flex flex-wrap md:gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            folders.map((elem, index) => {
              return (
                <Link className="w-1/2 md:w-auto flex flex-col justify-start items-center" to={`/myfolder/${elem._id}`}>
                  <FolderIcon
                    key={index}
                    className="w-16 h-16 text-yellow-700"
                  ></FolderIcon>{" "}
                  <Typography variant="small">{elem.title}</Typography>
                </Link>
              );
            })
          )}
          </div>
        </section>
      </section>

      <Fragment>
        <Dialog
          open={folderModalopen}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Create a folder</DialogHeader>
          <DialogBody divider>
            {error ? <p className="text-red-500 text-center">{error}</p> : ""}
            <Input id="folderName" label="Folder name" />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => createFolder()}
            >
              <span>Create</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </main>
  );
}

export default WhiteBoard;
