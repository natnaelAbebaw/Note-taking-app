import { useApp } from "../contexts/AppContext";

function Overlay() {
  const { zoomedNoteID } = useApp();
  return zoomedNoteID && <div className="overlay"></div>;
}

export default Overlay;
