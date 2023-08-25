import { useState } from "react";
import DropDown from "./DropDown";
import Icon from "./Icon";
import icons from "./sprite.svg";
import { useApp } from "../contexts/AppContext";

export default function TopNotesBar({ children }) {
  const [hiddenSubMenu, sethiddenSubMenu] = useState(false);
  const { mode, currentNotebook, dispatch } = useApp();
  function toggleSubmenu() {
    sethiddenSubMenu(true);
    setTimeout(() => {
      sethiddenSubMenu(false);
    }, 100);
  }

  if (!currentNotebook || mode === "note-mode") return;

  return (
    <header>
      <h2>{currentNotebook.title}</h2>
      {children}
      <p>
        <span>Created At: </span>
        {Intl.DateTimeFormat().format(currentNotebook.date)}
      </p>
      <DropDown hiddenSubMain={hiddenSubMenu}>
        <button
          className="btn"
          onClick={() => {
            toggleSubmenu();
            dispatch({
              type: "notebook/enabled",
              payload: currentNotebook.id,
            });
          }}
        >
          <Icon icon={`${icons}#star-outline`} style={{ color: "#000" }} />
          <span>Rename</span>
        </button>
        <button
          className="btn"
          onClick={() => {
            toggleSubmenu();
            dispatch({
              type: "notebook/deleted",
              payload: currentNotebook.id,
            });
          }}
        >
          <Icon icon={`${icons}#trash-outline`} style={{ color: "#000" }} />
          <span> Delete</span>
        </button>
      </DropDown>
    </header>
  );
}
