import { useEffect, useRef, useState } from "react";
import NOTEBOOK from "../model/NOTEBOOK";
import { useApp } from "../contexts/AppContext";
export default function AddNoteBookForm({ color, onAddNotebookForm }) {
  const [title, setTitle] = useState("");
  const { dispatch } = useApp();
  const NotebookTitleInputEl = useRef(null);

  useEffect(
    function () {
      NotebookTitleInputEl.current.focus();
    },
    [color]
  );

  return (
    <form
      className="notebook-form"
      style={{ backgroundColor: color }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!title) return;
        const newNotebook = new NOTEBOOK(
          crypto.randomUUID(),
          title,
          [],
          Date.now(),
          color
        );
        dispatch({ type: "notebook/created", payload: newNotebook });
        onAddNotebookForm(null);
      }}
    >
      <input
        ref={NotebookTitleInputEl}
        style={{ border: `1.5px solid ${color}` }}
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <button>add</button>
    </form>
  );
}
