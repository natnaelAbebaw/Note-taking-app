import { useState } from "react";

import SideBar from "./sidebar";
import TopBar from "./topBar";
import NoteBooks from "./noteBooks";
import Notes from "./notes";
import NOTE from "./model/NOTE";

export default function App() {
  const [notes, setNotes] = useState(LoadNotes());
  const [zoom, setZoom] = useState(null);
  const [edit, setEdit] = useState(null);

  function handleToggleEdit(id) {
    setEdit((edit) => (edit === id ? null : id));
  }

  function LoadNotes() {
    return JSON.parse(localStorage.getItem("notes"));
  }

  function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function handleCreateNote(color) {
    const newNote = new NOTE(
      crypto.randomUUID(),
      "Title",
      "content...",
      Date.now(),
      color
    );
    setNotes((notes) => [newNote, ...notes]);
    saveNotes([newNote, ...notes]);
    handleToggleEdit(newNote.id);
  }

  function handelUpdateNotes(id, title, content) {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, content } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  }

  function handleDeleteNote(id) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    saveNotes(newNotes);
  }

  function handleToggleZoom(id) {
    setZoom((z) => (z === id ? null : id));
  }

  function handleToggleFavorite(id) {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { ...note, favorite: note.favorite ? false : true }
        : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    console.log(id);
  }

  return (
    <div className="app">
      {zoom && <div className="overlay" onClick={() => setZoom(null)}></div>}
      <SideBar onCreateNote={handleCreateNote} />
      <main className="main">
        <TopBar />
        <div className="work-area">
          <NoteBooks />
          <Notes
            notes={notes}
            onUpdateNotes={handelUpdateNotes}
            onDeleteNote={handleDeleteNote}
            zoom={zoom}
            onToggleZoom={handleToggleZoom}
            onToggleFavorite={handleToggleFavorite}
            onToggleEdit={handleToggleEdit}
            edit={edit}
          />
        </div>
      </main>
    </div>
  );
}
