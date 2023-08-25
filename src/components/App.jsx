import { useState } from "react";

import SideBar from "./Sidebar";
import TopBar from "./TopBar";
import NoteBooks from "./Notebooks";
import Notes from "./Notes";
import MainArea from "./MainArea";
import { AppProvider } from "../contexts/AppContext";
import WorkArea from "./WorkArea";
import Overlay from "./Overlay";

export default function App() {
  const [showAddNotebookForm, setShowAddNotebookForm] = useState(false);
  const [showNotebookList, setShowNotebookList] = useState(false);

  function handleAddNotebookFrom(color) {
    setShowAddNotebookForm(color);
  }

  return (
    <AppProvider>
      <div className="app">
        <Overlay />
        <SideBar
          onAddNotebookForm={handleAddNotebookFrom}
          onSetShowNotebookList={setShowNotebookList}
        ></SideBar>
        <MainArea>
          <TopBar onShowNotebookList={setShowNotebookList} />
          <WorkArea
            showNotebookList={showNotebookList}
            onShowNotebookList={setShowNotebookList}
          >
            <NoteBooks
              showAddNotebookForm={showAddNotebookForm}
              onAddNotebookForm={handleAddNotebookFrom}
              onShowNotebookList={setShowNotebookList}
            />
            <Notes onShowNotebookList={setShowNotebookList} />
          </WorkArea>
        </MainArea>
      </div>
    </AppProvider>
  );
}
