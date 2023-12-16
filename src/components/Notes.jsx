import Note from "./Note";
import { useApp } from "../contexts/AppContext";
import AddBotton from "./AddBotton";
import TopNotesBar from "./TopNotesBar";
import NOTE from "../model/NOTEBOOK";

export default function Notes() {
  const {
    notes,
    mode,
    currentNotebook,
    dispatch,
    searchedNotes,
    status,
    favoriteNotes,
  } = useApp();

  function onCreate(color) {
    const newNote = new NOTE(crypto.randomUUID(), "", "", Date.now(), color);
    dispatch({
      type: "notebook/note/created",
      payload: { id: currentNotebook.id, note: newNote },
    });
  }
  return (
    <div className="notes">
      {status !== "favorite" && (
        <TopNotesBar>
          <AddBotton vertical={false} onCreate={onCreate} />
        </TopNotesBar>
      )}

      {status === "searching" && (
        <div className="search-stat">
          <h3>Searched Results: )</h3>

          <p>{searchedNotes ? searchedNotes.length : 0} founds</p>
          <button onClick={() => dispatch({ type: "status/active" })}>
            &times;
          </button>
        </div>
      )}

      {status === "favorite" && <h2 className="favorite">Favorite notes: )</h2>}

      <ul>
        {status === "active" &&
          mode === "note-mode" &&
          notes?.map((note) => <Note key={note.id} note={note} />)}
        {status === "active" && mode === "notebook-mode" && (
          <>
            {currentNotebook ? (
              currentNotebook.notes.map((note) => (
                <Note key={note.id} note={note} />
              ))
            ) : (
              <h2 className="instruction">Tap notebooks to see notes</h2>
            )}
          </>
        )}
        {status === "searching" &&
          searchedNotes?.map((note) => <Note key={note.id} note={note} />)}
        {status === "favorite" &&
          favoriteNotes.map((note) => <Note key={note.id} note={note} />)}
      </ul>
    </div>
  );
}
