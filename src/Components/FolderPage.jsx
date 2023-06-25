import { useState, useEffect, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import {
  FolderIcon,
  PlusIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function FolderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  function fetchNotes(id) {
    fetch(`http://localhost:5050/myfolder/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      });
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
        <section className="w-full">
          <div className="w-full p-4 flex justify-between">
            <Typography variant="h2" color="blue-gray">
              {notes.title}
            </Typography>
          </div>
        </section>
        <section className="p-4 flex flex-col md:flex-row md:items-center gap-6 md:gap-4">
          <Link to={`/myfolder/addnote/${id}`}>
            <div className="border-2 border-fuchsia-900 w-full md:w-20 h-16 rounded-lg shadow-lg flex justify-center items-center cursor-pointer">
              <p className="text-md font-medium flex justify-center items-center gap-4">
                <PlusIcon className="h-6 w-6 font-bold"></PlusIcon>
              </p>
            </div>
          </Link>
          <div className="flex flex-wrap md:gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : notes.length === 0 ? (
              <Typography variant="paragraph" color="gray">
                No notes to show.
              </Typography>
            ) : (
              notes.map((elem, index) => {
                return (
                  <Link
                    className="w-1/2 md:w-auto flex flex-col justify-start items-center"
                    to={`/myfolder/mynote/${elem._id}`}
                  >
                    <ClipboardDocumentIcon
                      key={index}
                      className="w-16 h-16 text-blue-700"
                    ></ClipboardDocumentIcon>{" "}
                    <Typography variant="small">{elem.title}</Typography>
                  </Link>
                );
              })
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
