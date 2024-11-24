import React, { useState } from "react";

const NoteForm = ({ fetchNotes }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Others");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, description, category };
    await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    fetchNotes();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Work</option>
        <option>Personal</option>
        <option>Others</option>
      </select>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
