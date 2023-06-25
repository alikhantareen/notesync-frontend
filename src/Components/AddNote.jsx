import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddNote() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { id } = useParams();
  const [noteCreated, setNoteCreated] = useState(false);
  const [error, setError] = useState("");
  const log = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };
  function createNote(id) {
    setError("");
    const title = document.querySelector("#noteTitle").value;
    const description = log();
    if (!title) {
      setError("Please provide a title");
      return;
    }
    fetch(`http://localhost:5050/myfolder/addnote/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: localStorage.getItem("user_id"),
        folder: id,
        title: title,
        description: description,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.newNote) {
          navigate(`/myfolder/${id}`);
        } else {
          setError(data.error);
        }
      });
  }
  return (
    <>
      <Navbar />
      <div className="w-full p-4 flex justify-center items-center">
        <div className="flex flex-col justify-center gap-4 w-full md:w-2/3">
          <Typography variant="h2" color="blue">
            Create a note
          </Typography>
          {error ? <p className="text-red-500">{error}</p> : ""}
          <Input id="noteTitle" label="Title" />
          <Editor
            apiKey="27tp408napsi18tfhf042ha3cncbzn6eb22y9e8hp1gdtld5"
            onInit={(evt, editor) => (editorRef.current = editor)}
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
          <Button className="w-32" onClick={() => createNote(id)}>
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
