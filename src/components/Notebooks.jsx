import { useApp } from "../contexts/AppContext";

import AddNoteBookForm from "./AddNoteBookForm";
import NoteBook from "./Notebook";

export default function NoteBooks({
  showAddNotebookForm,
  onAddNotebookForm,
  onShowNotebookList,
}) {
  const { notebooks } = useApp();

  return (
    <div className="note-books">
      {
        <>
          <p>Notebooks</p>

          <button
            className="btn btn-back"
            onClick={() => onShowNotebookList(false)}
          >
            &larr;
          </button>
          {showAddNotebookForm && (
            <AddNoteBookForm
              color={showAddNotebookForm}
              onAddNotebookForm={onAddNotebookForm}
            />
          )}
          <ul>
            {notebooks.length !== 0 ? (
              notebooks.map((notebook) => (
                <NoteBook key={notebook.id} notebook={notebook} />
              ))
            ) : (
              <p style={{ marginTop: "14rem" }} className="instruction">
                Add notebook
              </p>
            )}
          </ul>
        </>
      }
    </div>
  );
}
