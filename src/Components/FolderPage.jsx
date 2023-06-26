import { useState, useEffect, Fragment } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
  } from "@material-tailwind/react";
import {
  FolderOpenIcon,
  PlusIcon,
  DocumentIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function FolderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, folderTitle] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  function fetchNotes(id) {
    fetch(`http://localhost:5050/myfolder/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotes(data.notes);
        folderTitle(data.folderTitle.title);
        setLoading(false);
      });
  }
  function deleteFolder(id) {
    fetch(`http://localhost:5050/folder/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate(`/whiteboard/${localStorage.getItem('user_id')}`);
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
    fetchNotes(id);
  }, []);
  return (
    <main>
      <Navbar />
      <section className="w-full">
        <section className="w-full flex flex-col items-center md:flex-row">
          <div className="w-full p-4 flex justify-start items-center gap-4">
            <FolderOpenIcon className="w-10 h-10 text-blue-700"></FolderOpenIcon>
            <Typography variant="h2" color="blue">
              {Title(title)}
            </Typography>
          </div>
          <div className="w-full md:w-fit p-2">
          <Button className="w-full md:w-fit mr-3" color="red" onClick={handleOpen}>Delete</Button>
          </div>
        </section>
        <section className="p-4 flex flex-col md:flex-row md:items-center gap-6 md:gap-4">
          <Link to={`/myfolder/addnote/${id}`}>
            <Button
              variant="outlined"
              className="w-full md:w-16 h-16 rounded-full shadow-lg flex justify-center items-center cursor-pointer md:-mt-6"
            >
              <p className="text-md font-medium flex justify-center items-center gap-4">
                <PlusIcon className="h-6 w-6 font-bold"></PlusIcon>
              </p>
            </Button>
          </Link>
          <div className="flex flex-wrap md:gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : notes.length === 0 ? (
              <Typography className="md:-mt-6" variant="paragraph" color="gray">
                Empty folder.
              </Typography>
            ) : (
              notes.map((elem, index) => {
                return (
                  <Link
                    className="w-1/2 md:w-auto flex flex-col justify-start items-center mb-4 hover:-translate-y-2 duration-500"
                    to={`/myfolder/mynote/${elem._id}`}
                  >
                    <DocumentIcon
                      key={index}
                      className="w-16 h-16 text-blue-700"
                    ></DocumentIcon>{" "}
                    <Typography variant="small">{elem.title}</Typography>
                  </Link>
                );
              })
            )}
          </div>
        </section>
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
                Do you really want to delete this folder?
              </Typography>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button variant="text" color="blue-gray" onClick={handleOpen}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={() => deleteFolder(id)}>
                Yes
              </Button>
            </DialogFooter>
          </Dialog>
        </Fragment>
    </main>
  );
}
