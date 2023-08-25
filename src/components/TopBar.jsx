import { useEffect, useState } from "react";
import icons from "./sprite.svg";
import { useApp } from "../contexts/AppContext";

export default function TopBar({ onShowNotebookList }) {
  const [query, setQuery] = useState("");
  const { status, mode, dispatch } = useApp();
  useEffect(
    function () {
      if (status === "active") setQuery("");
    },
    [status]
  );
  return (
    <div className="top-bar">
      <button
        className={`btn-note-books ${mode === "notebook-mode" ? mode : ""}`}
        type="button"
        onClick={() => {
          dispatch({ type: "mode/toggled" });
          onShowNotebookList(true);
        }}
      >
        NOTEBOOKS
      </button>
      <form action="">
        <input
          type="text"
          name="note"
          placeholder="Search"
          id="note"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            dispatch({ type: "note/searched", payload: e.target.value });
          }}
        />
        <label htmlFor="note">
          <svg className="icon">
            <use href={`${icons}#search-outline`}></use>
          </svg>
        </label>
      </form>
      <button
        className="btn btn--circle btn--circle--big"
        type="button"
        onClick={()=>dispatch({ type: "note/favorite-clicked" })}
      >
        <svg className="icon icon-big">
          <use href={`${icons}#star-outline`}></use>
        </svg>
      </button>
    </div>
  );
}
