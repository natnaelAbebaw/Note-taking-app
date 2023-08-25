import { useState } from "react";
import Icon from "./Icon";
import icons from "./sprite.svg";
import { useApp } from "../contexts/AppContext";

export default function AddBotton({ vertical, onCreate, onAddNotebookForm }) {
  const colors = ["#ff966c", "#fdcd67", "#dafb88", " #c76cff", "#00d2ff"];
  const [showDots, SetShowDots] = useState(false);
  const { mode } = useApp();

  function toggleDots() {
    SetShowDots((s) => !s);
  }

  return (
    <div className="add-dots">
      {mode === "notebook-mode" ? (
        <p style={{ fontSize: "1.2rem" }}>ADD NOTEBOOK</p>
      ) : (
        <p style={{ fontSize: "1.2rem" }}>ADD NOTE</p>
      )}

      <button
        type="button"
        className="btn btn-plus btn--circle btn--circle--big"
        onClick={() => {
          toggleDots();
          onAddNotebookForm && onAddNotebookForm(null);
        }}
      >
        <Icon icon={`${icons}#add-outline`} className={"icon-big"} />
      </button>

      <ul
        className={`dots ${vertical ? "dots--column" : ""} ${
          showDots ? "dots-active" : "dots-deactive"
        }`}
      >
        {colors.map((color, i) => (
          <li
            style={{ backgroundColor: color }}
            key={i}
            className="dot"
            onClick={() => onCreate(color)}
          ></li>
        ))}
      </ul>
    </div>
  );
}
