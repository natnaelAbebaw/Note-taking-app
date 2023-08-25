import { useApp } from "../contexts/AppContext";

function WorkArea({ children, showNotebookList, onShowNotebookList }) {
  const { mode } = useApp();
  return (
    <div
      className={`work-area ${
        showNotebookList && mode === "notebook-mode" ? "note-books-active" : ""
      }`}
    >
      {!showNotebookList && mode === "notebook-mode" && (
        <button
          className="btn btn-back"
          onClick={() => onShowNotebookList(true)}
        >
          &rarr;
        </button>
      )}
      {children}
    </div>
  );
}

export default WorkArea;
