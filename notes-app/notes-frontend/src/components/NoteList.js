import React, { useEffect, useState } from "react";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [search]);

  const fetchNotes = async () => {
    const query = search ? `?search=${search}` : "";
    const response = await fetch(`http://localhost:5000/api/notes${query}`);
    const data = await response.json();
    setNotes(data);
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
