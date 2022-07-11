import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  React.useEffect(()=>{
    axios("/api")
    .then((res)=>{setNotes(res.data)});
  },[]);

  function addNote(newNote) {
    axios.post("/create",newNote)
    .then(res=>console.log("data send"))
    setNotes(prevNotes => {
      return [...prevNotes, newNote];

    });
  }

  function deleteNote(id) {

    axios.delete(`/delete/${id}`).then(res=>{console.log("deleted")})

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem._id !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
