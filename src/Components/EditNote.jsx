import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");
  const [description, setDescription] = useState(null);
  const [folder, setFolder] = useState(null);
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const log = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };
  function getNote(id) {
    fetch(`http://localhost:5050/myfolder/mynote/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.title) {
          setNote(data);
          setLoading(false);
          setFolder(data.folder);
          setDescription(data.description);
          setTitle(data.title);
        } else {
          alert(data.error);
          return;
        }
      });
  }
  function updateNote(id) {
    setError("");
    const title = document.querySelector("#noteTitle").value;
    const description = log();
    if (!title) {
      setError("Please provide a title");
      return;
    }
    fetch(`http://localhost:5050/update-note/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: localStorage.getItem("user_id"),
        folder: folder,
        title: title,
        description: description,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.title) {
          navigate(`/myfolder/${folder}`);
        } else {
          setError(data.error);
        }
      });
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full p-4 flex justify-center items-center">
          <div className="flex flex-col justify-center gap-4 w-full md:w-2/3">
            <Typography variant="h2" color="blue">
              Edit a note
            </Typography>
            {error ? <p className="text-red-500">{error}</p> : ""}
            <Input
              defaultValue={title}
              className="bg-white"
              id="noteTitle"
              label="Title"
            />
            <Editor
              apiKey="27tp408napsi18tfhf042ha3cncbzn6eb22y9e8hp1gdtld5"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={description}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <Button className="w-32" onClick={() => updateNote(note._id)}>
              Update
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
