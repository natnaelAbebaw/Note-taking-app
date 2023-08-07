import { useState } from "react";
import Note from "./note";

export default function Notes({
  notes,
  onUpdateNotes,
  onDeleteNote,
  zoom,
  onToggleZoom,
  onToggleFavorite,
  edit,
  onToggleEdit
}) {


  return (
    <div className="notes">
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            onUpdateNotes={onUpdateNotes}
            note={note}
            onDeleteNote={onDeleteNote}
            onToggleEdit={onToggleEdit}
            edit={edit}
            zoom={zoom}
            onToggleZoom={onToggleZoom}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ul>
    </div>
  );
}
