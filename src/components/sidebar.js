import AddBotton from "./addBotton";

export default function SideBar({ onCreateNote }) {
  return (
    <div className="sidebar">
      <div className="brand-logo">Note</div>
      <AddBotton
        className="dots--column"
        icon="icon-big"
        onCreateNote={onCreateNote}
      />
    </div>
  );
}
