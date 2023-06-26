import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { ChevronLeftIcon, BellIcon } from "@heroicons/react/24/solid";
import parse from "html-react-parser";

export default function ViewNote() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);
  const [folderID, setFolderID] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  function getNote(id) {
    fetch(`http://localhost:5050/myfolder/mynote/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.title) {
          setNote(data);
          setLoading(false);
          setFolderID(data.folder);
        } else {
          alert(data.error);
          return;
        }
      });
  }
  function deleteNote(id, folder) {
    fetch(`http://localhost:5050/note/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate(`/myfolder/${folder}`);
        } else {
          alert(data.error);
        }
      });
  }
  function Title(elem) {
    return elem.toUpperCase();
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    getNote(id);
  }, []);
  return (
    <>
      <Navbar />
      <main className="w-full p-4 flex flex-col gap-4 justify-center items-center">
        <Link
          to={`/myfolder/${folderID}`}
          className="self-start w-full md:w-fit"
        >
          <Button className="flex gap-1">
            <ChevronLeftIcon className="w-4 h-4"></ChevronLeftIcon> Back
          </Button>
        </Link>
        <section className="flex flex-col justify-center gap-4 w-full md:w-2/3 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-4">
              <Typography variant="h2" color="blue">
                {Title(note.title)}
              </Typography>
              <Typography id="noteContainer" className="p-2">
                {parse(note.description)}
              </Typography>
              <div className="w-full flex gap-4">
                <Link to={`/edit-note/${note._id}`}>
                  <Button className="w-full md:w-fit">Edit</Button>
                </Link>
                <Button
                  className="w-full md:w-fit"
                  color="red"
                  onClick={handleOpen}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </section>
        <Fragment>
          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>
              <Typography variant="h5" color="blue-gray">
                Your Attention is Required!
              </Typography>
            </DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
              <BellIcon className="h-16 w-16 text-red-500" />
              <Typography color="red" variant="h4">
                Do you really want to delete this note?
              </Typography>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button variant="text" color="blue-gray" onClick={handleOpen}>
                Cancel
              </Button>
              <Button
                variant="gradient"
                onClick={() => deleteNote(note._id, note.folder)}
              >
                Yes
              </Button>
            </DialogFooter>
          </Dialog>
        </Fragment>
      </main>
    </>
  );
}
