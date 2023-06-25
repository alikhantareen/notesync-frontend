import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

export default function ViewNote() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);

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
  useEffect(() => {
    getNote(id);
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{note.title}</p>
        </div>
      )}
    </>
  );
}
