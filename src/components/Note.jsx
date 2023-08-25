import { useRef, useState, useEffect } from "react";
import Icon from "./Icon";
import icons from "./sprite.svg";
import DropDown from "./DropDown";
import { useApp } from "../contexts/AppContext";

export default function Note({ note }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const { mode, currentNotebook, zoomedNoteID, editedNoteID, dispatch } =
    useApp();
  const textareaEl = useRef(null);
  useEffect(
    function () {
      if (editedNoteID === note.id) {
        textareaEl.current.focus();
      }
    },
    [editedNoteID, note.id]
  );

  useEffect(
    function () {
      document.addEventListener("keydown", function (e) {
        if (e.code === "Escape") {
          dispatch({ type: "note/edited", action: null });
        }
      });
    },
    [dispatch]
  );

  function handleUpdateNote(e, type) {
    type === "title" ? setTitle(e.target.value) : setContent(e.target.value);
    mode === "notebook-mode"
      ? dispatch({
          type: "notebook/note/updated",
          payload: {
            noteId: note.id,
            notebookId: currentNotebook.id,
            title: type === "title" ? e.target.value : title,
            content: type === "title" ? content : e.target.value,
          },
        })
      : dispatch({
          type: "note/updated",
          payload: {
            id: note.id,
            title: type === "title" ? e.target.value : title,
            content: type === "title" ? content : e.target.value,
          },
        });
  }

  function handleFavoriteNote() {
    mode === "notebook-mode"
      ? dispatch({
          type: "notebook/note/favorite",
          payload: { notebookId: currentNotebook.id, noteId: note.id },
        })
      : dispatch({ type: "note/favorite", payload: note.id });
  }

  function handleDeleteNote() {
    mode === "notebook-mode"
      ? dispatch({
          type: "notebook/note/deleted",
          payload: { notebookId: currentNotebook.id, noteId: note.id },
        })
      : dispatch({ type: "note/deleted", payload: note.id });
  }

  function handleZoomNote() {
    dispatch({ type: "note/zoomed", payload: note.id });
  }

  function handleEditNote() {
    dispatch({ type: "note/edited", payload: note.id });
  }

  return (
    <li
      className={`note ${zoomedNoteID === note.id ? "note-zoom" : ""}`}
      style={{ backgroundColor: note.color }}
    >
      <textarea
        placeholder="Title"
        value={
          editedNoteID !== note.id && title.length > 15
            ? title.slice(0, 15) + "..."
            : title
        }
        onChange={(e) => {
          handleUpdateNote(e, "title");
        }}
        disabled={editedNoteID !== note.id}
      />
      <textarea
        ref={textareaEl}
        placeholder="Content..."
        value={content}
        onChange={(e) => {
          handleUpdateNote(e, "content");
        }}
        disabled={editedNoteID !== note.id}
      />
      <p className="date">{Intl.DateTimeFormat().format(note.date)}</p>

      {note.favorite && (
        <Icon icon={`${icons}#star-outline`} className="icon-sm favorite" />
      )}

      <DropDown>
        <button className="btn" onClick={handleFavoriteNote}>
          <Icon icon={`${icons}#star-outline`} style={{ color: "#000" }} />
          <span>{note.favorite ? "Unfavorite" : "Favorite"}</span>
        </button>
        <button className="btn" onClick={handleDeleteNote}>
          <Icon icon={`${icons}#trash-outline`} style={{ color: "#000" }} />
          <span> Delete</span>
        </button>
      </DropDown>
      <div className="btn-bottom">
        <button
          className="btn btn--circle btn--circle--sm"
          onClick={handleZoomNote}
        >
          <Icon icon={`${icons}#expand-outline`} />
        </button>
        <button
          className="btn btn--circle btn--circle--sm"
          onClick={handleEditNote}
        >
          <Icon icon={`${icons}#create-outline`} />
        </button>
      </div>
    </li>
  );
}
