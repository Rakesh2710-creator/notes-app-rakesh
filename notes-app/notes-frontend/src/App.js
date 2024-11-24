import React from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const App = () => {
  return (
    <div>
      <h1>Notes Manager</h1>
      <NoteForm />
      <NoteList />
    </div>
  );
};

export default App;
