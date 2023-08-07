import { useState } from "react";
import Icon from "./icon";
import icons from "./sprite.svg";

export default function AddBotton({ className, children, icon, onCreateNote }) {
  const colors = ["#ff966c", "#fdcd67", "#dafb88", " #c76cff", "#00d2ff"];
  const [showDots, SetShowDots] = useState(false);

  function toggleDots() {
    SetShowDots((s) => !s);
  }

  return (
    <div className="add-dots">
      {children}
      <button
        type="button"
        className="btn btn-plus btn--circle btn--circle--big"
        onClick={toggleDots}
      >
        <Icon icon={`${icons}#add-outline`} className={`${icon}`} />
      </button>

      <ul
        className={`dots ${className} ${
          showDots ? "dots-active" : "dots-deactive"
        }`}
      >
        {colors.map((color, i) => (
          <li
            style={{ backgroundColor: color }}
            key={i}
            onClick={() => onCreateNote(color)}
          ></li>
        ))}
      </ul>
    </div>
  );
}
