import { createContext, useContext, useEffect, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")),
  notebooks: JSON.parse(localStorage.getItem("notebooks")),
  currentNotebook: null,
  mode: "note-mode",
  status: "active",
  zoomedNoteID: null,
  enabledNotebookID: null,
  editedNoteID: null,
  searchedNotes: [],
  favoriteNotes: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "mode/toggled":
      return {
        ...state,
        mode: state.mode === "notebook-mode" ? "note-mode" : "notebook-mode",
        status: "active",
      };
    case "notes/active":
      return {
        ...state,
        mode: "note-mode",
      };
    case "note/created":
      return {
        ...state,
        status: "active",
        notes: [action.payload, ...state.notes],
        editedNoteID: action.payload.id,
      };
    case "note/updated":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? {
                ...note,
                title: action.payload.title,
                content: action.payload.content,
              }
            : note
        ),
      };

    case "note/deleted":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        searchedNotes:
          state.status === "searching" &&
          state.searchedNotes.filter((note) => note.id !== action.payload),
        favoriteNotes:
          state.status === "favorite" &&
          state.favoriteNotes.filter((note) => note.id !== action.payload),
      };
    case "note/favorite":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload
            ? { ...note, favorite: !note.favorite }
            : note
        ),
        searchedNotes:
          state.status === "searching" &&
          state.searchedNotes.map((note) =>
            note.id === action.payload
              ? { ...note, favorite: !note.favorite }
              : note
          ),
        favoriteNotes:
          state.status === "favorite" &&
          state.favoriteNotes.map((note) =>
            note.id === action.payload
              ? { ...note, favorite: !note.favorite }
              : note
          ),
      };
    case "note/zoomed":
      return {
        ...state,
        zoomedNoteID:
          state.zoomedNoteID === action.payload ? null : action.payload,
      };
    case "note/edited":
      return {
        ...state,
        editedNoteID:
          state.editedNoteID === action.payload ? null : action.payload,
      };
    case "status/active":
      return { ...state, status: "active" };

    case "notebook/active":
      return { ...state, mode: "notebook-mode" };

    case "notebook/created":
      return {
        ...state,
        status: "active",
        notebooks: [action.payload, ...state.notebooks],
        currentNotebook: action.payload,
      };

    case "notebook/enabled":
      return {
        ...state,
        enabledNotebookID: action.payload,
      };

    case "notebook/clicked":
      return {
        ...state,
        currentNotebook: action.payload,
        status: "active",
      };
    case "notebook/deleted":
      return {
        ...state,
        notebooks: state.notebooks.filter(
          (notebook) => notebook.id !== action.payload
        ),
        currentNotebook:
          state.currentNotebook?.id === action.payload
            ? null
            : state.currentNotebook,
      };
    case "notebook/updated":
      return {
        ...state,
        notebooks: state.notebooks.map((notebook) =>
          notebook.id === action.payload.id
            ? { ...notebook, title: action.payload.title }
            : notebook
        ),
      };
    case "notebook/note/created":
      const notes = [action.payload.note, ...state.currentNotebook.notes];
      return {
        ...state,
        status: "active",
        notebooks: state.notebooks.map((notebook) =>
          notebook.id === action.payload.id ? { ...notebook, notes } : notebook
        ),
        currentNotebook: {
          ...state.currentNotebook,
          notes,
        },
        editedNoteID: action.payload.note.id,
      };

    case "notebook/note/deleted":
      const deleteNotes = state.currentNotebook.notes.filter(
        (note) => note.id !== action.payload.noteId
      );
      return {
        ...state,
        notebooks: state.notebooks.map((notebook) =>
          notebook.id === action.payload.notebookId
            ? {
                ...notebook,
                notes: deleteNotes,
              }
            : notebook
        ),
        currentNotebook: {
          ...state.currentNotebook,
          notes: deleteNotes,
        },
        searchedNotes:
          state.status === "searching" &&
          state.searchedNotes.filter(
            (note) => note.id !== action.payload.noteId
          ),
        favoriteNotes:
          state.status === "favorite" &&
          state.favoriteNotes.filter(
            (note) => note.id !== action.payload.noteId
          ),
      };
    case "notebook/note/updated":
      const updatedNotes = state.currentNotebook.notes.map((note) =>
        note.id === action.payload.noteId
          ? {
              ...note,
              title: action.payload.title,
              content: action.payload.content,
            }
          : note
      );

      return {
        ...state,
        notebooks: state.notebooks.map((notebook) =>
          notebook.id === action.payload.notebookId
            ? {
                ...notebook,
                notes: updatedNotes,
              }
            : notebook
        ),
        currentNotebook: {
          ...state.currentNotebook,
          notes: updatedNotes,
        },
      };
    case "notebook/note/favorite":
      const notesOnFavorite = state.currentNotebook.notes.map((note) =>
        note.id === action.payload.noteId
          ? {
              ...note,
              favorite: !note.favorite,
            }
          : note
      );
      return {
        ...state,
        notebooks: state.notebooks.map((notebook) =>
          notebook.id === action.payload.notebookId
            ? {
                ...notebook,
                notes: notesOnFavorite,
              }
            : notebook
        ),
        currentNotebook: {
          ...state.currentNotebook,
          notes: notesOnFavorite,
        },
        searchedNotes:
          state.status === "searching" &&
          state.searchedNotes.map((note) =>
            note.id === action.payload.noteId
              ? {
                  ...note,
                  favorite: !note.favorite,
                }
              : note
          ),
        favoriteNotes:
          state.status === "favorite" &&
          state.favoriteNotes.map((note) =>
            note.id === action.payload.noteId
              ? {
                  ...note,
                  favorite: !note.favorite,
                }
              : note
          ),
      };

    case "note/searched":
      return {
        ...state,
        status: "searching",
        searchedNotes: (state.mode === "notebook-mode"
          ? state.currentNotebook?.notes
          : state.notes
        )?.filter(
          (note) =>
            note.title.includes(action.payload) ||
            note.content.includes(action.payload)
        ),
      };

    case "note/favorite-clicked":
      return {
        ...state,
        status: state.status === "favorite" ? "active" : "favorite",
        favoriteNotes:
          state.status === "active"
            ? [
                ...state.notes.filter((note) => note.favorite === true),
                ...state.notebooks.reduce(
                  (acc, notebook) => [
                    ...acc,
                    ...notebook.notes.filter((note) => note.favorite === true),
                  ],
                  []
                ),
              ]
            : [],
      };

    case "note/favorite-filter":
      return {
        ...state,
        favoriteNotes: [
          ...state.notes.filter((note) => note.favorite === true),
          ...state.notebooks.reduce(
            (acc, notebook) => [
              ...acc,
              ...notebook.notes.filter((note) => note.favorite === true),
            ],
            []
          ),
        ],
      };
    default:
      throw new Error("Unkown action");
  }
}

function AppProvider({ children }) {
  const [
    {
      notes,
      enabledNotebookID,
      notebooks,
      currentNotebook,
      mode,
      zoomedNoteID,
      editedNoteID,
      searchedNotes,
      status,
      favoriteNotes,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      localStorage.setItem("notes", JSON.stringify(notes));
    },
    [notes]
  );

  useEffect(
    function () {
      localStorage.setItem("notebooks", JSON.stringify(notebooks));
    },
    [notebooks]
  );

  return (
    <AppContext.Provider
      value={{
        enabledNotebookID,
        notes,
        notebooks,
        currentNotebook,
        mode,
        zoomedNoteID,
        editedNoteID,
        dispatch,
        searchedNotes,
        favoriteNotes,
        status,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("Context is accessed outside context component!");

  return context;
}

export { AppProvider, useApp };
