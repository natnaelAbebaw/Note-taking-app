import { useState } from "react";
import Icon from "./icon";
import icons from "./sprite.svg";

export default function Note({
  note,
  onUpdateNotes,
  onDeleteNote,
  edit,
  onToggleEdit,
  zoom,
  onToggleZoom,
  onToggleFavorite,
}) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  console.log(zoom, note.id);
  return (
    <li
      className={`note ${zoom === note.id ? "note-zoom" : ""}`}
      style={{ backgroundColor: note.color }}
    >
      <textarea
        value={
          edit !== note.id && title.length > 15
            ? title.slice(0, 15) + "..."
            : title
        }
        onChange={(e) => {
          setTitle(e.target.value);
          onUpdateNotes(note.id, e.target.value, content);
        }}
        disabled={edit !== note.id}
      />
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          onUpdateNotes(note.id, title, e.target.value);
        }}
        disabled={edit !== note.id}
      />
      <p className="date">{Intl.DateTimeFormat().format(note.date)}</p>
      <div className="btn-top">
        {note.favorite && (
          <Icon icon={`${icons}#star-outline`} className="icon-sm" />
        )}

        <button className="btn btn-sub-menu">
          <Icon icon={`${icons}#ellipsis-vertical`} />
        </button>

        <div className="sub-menu">
          <button className="btn" onClick={() => onToggleFavorite(note.id)}>
            <Icon icon={`${icons}#star-outline`} style={{ color: "#000" }} />
            <span>{note.favorite ? "Unfavorite" : "Favorite"}</span>
          </button>
          <button className="btn" onClick={() => onDeleteNote(note.id)}>
            <Icon icon={`${icons}#trash-outline`} style={{ color: "#000" }} />
            <span> Delete</span>
          </button>
        </div>
      </div>
      <div className="btn-bottom">
        <button
          className="btn btn--circle btn--circle--sm"
          onClick={() => {
            onToggleZoom(note.id);
            onToggleEdit(note.id);
          }}
        >
          <Icon icon={`${icons}#expand-outline`} />
        </button>
        <button
          className="btn btn--circle btn--circle--sm"
          onClick={() => onToggleEdit(note.id)}
        >
          <Icon icon={`${icons}#create-outline`} />
        </button>
      </div>
    </li>
  );
}
