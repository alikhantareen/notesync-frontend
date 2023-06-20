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
import Navbar from "./Navbar";

function WhiteBoard() {
  const [folderModalopen, setFolderModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [folderCreated, setFolderCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  function fetchFolders() {
    fetch("http://localhost:5050/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFolders(data);
        setLoading(false);
      });
  }
  function createFolder() {
    const title = document.querySelector("#folderName").value;
    fetch("http://localhost:5050/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {title: title})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setFolderCreated(true);
        setFolderModal(!folderModalopen);
    })
  }
  const handleOpen = () => setFolderModal(!folderModalopen);
  useEffect(() => {
    fetchFolders();
  }, [folderCreated]);
  return (
    <main>
      <Navbar />
      <section className="w-full">
        <section className="w-full">
          <div className="w-full p-4 flex justify-between">
            <Typography variant="h2" color="blue-gray">
              Whiteboard
            </Typography>
          </div>
        </section>
        <section className="flex flex-col md:flex-row justify-between w-full">
          <Typography variant="h4" className="p-4">
            My folders
          </Typography>
        </section>
        <section className="p-4 flex flex-col md:flex-row gap-6 md:gap-4">
          <div
            onClick={handleOpen}
            className="border-2 border-fuchsia-900 w-full md:w-20 h-16 rounded-lg shadow-lg flex justify-center items-center cursor-pointer"
          >
            <p className="text-md font-medium flex justify-center items-center gap-4">
              <PlusIcon className="h-6 w-6 font-bold"></PlusIcon>
            </p>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            folders.map((elem, index) => {
              return (
                <div key={index} className="border-2 border-fuchsia-900 w-full md:w-40 h-16 rounded-lg shadow-lg flex justify-center items-center">
                  <p className="text-md font-medium flex justify-center items-center gap-4">
                    <FolderIcon className="h-4 w-4"></FolderIcon> {elem.title}
                  </p>
                </div>
              );
            })
          )}
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
            <Button variant="gradient" color="green" onClick={createFolder}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </main>
  );
}

export default WhiteBoard;