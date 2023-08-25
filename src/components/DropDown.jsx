import icons from "./sprite.svg";
import Icon from "./Icon";

export default function DropDown({ children, hiddenSubMain }) {
  return (
    <div className="drop-down">
      <button className="btn btn-sub-menu">
        <Icon icon={`${icons}#ellipsis-vertical`} />
      </button>

      <div className={`sub-menu ${hiddenSubMain ? "sub-menu-hidden" : ""} `}>
        {children}
      </div>
    </div>
  );
}
