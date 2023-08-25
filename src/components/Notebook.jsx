import icons from "./sprite.svg";
import Icon from "./Icon";
import DropDown from "./DropDown";
import { useState, useEffect, useRef } from "react";
import { useApp } from "../contexts/AppContext";

export default function NoteBook({ notebook }) {
  const [title, setTitle] = useState(notebook.title);
  const [hiddenSubMenu, sethiddenSubMenu] = useState(false);
  const titleInputEl = useRef(null);
  const { enabledNotebookID, currentNotebook, dispatch } = useApp();
  function toggleSubmenu() {
    sethiddenSubMenu(true);
    setTimeout(() => {
      sethiddenSubMenu(false);
    }, 100);
  }

  useEffect(
    function () {
      if (enabledNotebookID === notebook.id) {
        titleInputEl.current.focus();
      }
    },
    [enabledNotebookID, notebook.id, titleInputEl]
  );

  function handlesubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "notebook/enabled", payload: null });
  }

  function handleUpdateNotebook(e) {
    setTitle(e.target.value);
    dispatch({
      type: "notebook/updated",
      payload: { id: notebook.id, title: e.target.value },
    });
  }

  function handleEnableNotebook(e) {
    e.stopPropagation();
    dispatch({ type: "notebook/enabled", payload: notebook.id });
    toggleSubmenu();
    titleInputEl.current.focus();
  }

  function handleDeleteNotebook(e) {
    e.stopPropagation();
    toggleSubmenu();
    dispatch({ type: "notebook/deleted", payload: notebook.id });
  }

  return (
    <li
      style={{ backgroundColor: `${notebook.color}` }}
      className={`note-book ${
        currentNotebook && notebook.id === currentNotebook.id
          ? "note-book-active"
          : ""
      }`}
      onClick={() => dispatch({ type: "notebook/clicked", payload: notebook })}
    >
      <form onSubmit={(e) => handlesubmit(e)}>
        <input
          className={enabledNotebookID === notebook.id ? "input-active" : ""}
          ref={titleInputEl}
          id={notebook.id}
          type="text"
          value={title}
          onChange={(e) => {
            handleUpdateNotebook(e);
          }}
          disabled={enabledNotebookID !== notebook.id}
        />

        {enabledNotebookID === notebook.id && (
          <button className="btn btn--circle btn--circle--sm btn-rename">
            <Icon icon={`${icons}#star-outline`} />
          </button>
        )}
      </form>

      <div>
        <p className="date">{Intl.DateTimeFormat().format(notebook.date)}</p>
        <p>{notebook.notes.length} notes</p>
      </div>

      <DropDown hiddenSubMain={hiddenSubMenu}>
        <button
          className="btn"
          htmlFor={notebook.id}
          onClick={(e) => {
            handleEnableNotebook(e);
          }}
        >
          <Icon icon={`${icons}#star-outline`} style={{ color: "#000" }} />
          <span>Rename</span>
        </button>
        <button
          className="btn"
          onClick={(e) => {
            handleDeleteNotebook(e);
          }}
        >
          <Icon icon={`${icons}#trash-outline`} style={{ color: "#000" }} />
          <span> Delete</span>
        </button>
      </DropDown>
    </li>
  );
}
