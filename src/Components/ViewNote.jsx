import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import parse from "html-react-parser";

export default function ViewNote() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  function getNote(id) {
    fetch(`http://localhost:5050/myfolder/mynote/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.title) {
          setNote(data);
          setLoading(false);
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
        console.log(data);
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
    getNote(id);
  }, []);
  return (
    <>
      <Navbar />
      <main className="w-full p-4 flex flex-col gap-4 justify-center items-center">
        <section className="flex flex-col justify-center gap-4 w-full md:w-2/3 p-4 shadow-lg rounded-xl">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-4">
              <Typography variant="h2" color="blue">
                {Title(note.title)}
              </Typography>
              <Typography className="p-2">{parse(note.description)}</Typography>
              <div className="w-full flex gap-4">
                <Button className="w-full md:w-fit">Edit</Button>
                <Button
                  className="w-full md:w-fit"
                  color="red"
                  onClick={() => deleteNote(note._id, note.folder)}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
