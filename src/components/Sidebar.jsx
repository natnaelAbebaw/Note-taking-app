import { useApp } from "../contexts/AppContext";
import AddBotton from "./AddBotton";
import NOTE from "../model/NOTE";

export default function SideBar({ onAddNotebookForm, onSetShowNotebookList }) {
  const { mode, dispatch } = useApp();
  function onCreate(color) {
    if (mode === "notebook-mode") {
      onAddNotebookForm(color);
      onSetShowNotebookList(true);
    } else {
      const newNote = new NOTE(crypto.randomUUID(), "", "", Date.now(), color);
      dispatch({ type: "note/created", payload: newNote });
    }
  }

  return (
    <div className="sidebar">
      <div className="brand-logo">Note</div>
      <AddBotton
        vertical={true}
        onCreate={onCreate}
        onAddNotebookForm={onAddNotebookForm}
      />
    </div>
  );
}
