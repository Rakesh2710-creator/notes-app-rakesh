const express = require("express");
const db = require("../db/database");
const router = express.Router();

// Create Note
router.post("/", (req, res) => {
  const { title, description, category } = req.body;
  const query = `
        INSERT INTO notes (title, description, category)
        VALUES (?, ?, ?)
    `;
  db.run(query, [title, description, category || "Others"], function (err) {
    if (err) return res.status(500).json({ error: "Failed to create note" });
    res.status(201).json({ id: this.lastID, title, description, category });
  });
});

// Get All Notes
router.get("/", (req, res) => {
  const { search, category } = req.query;
  let query = "SELECT * FROM notes WHERE 1=1";
  const params = [];

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }
  if (search) {
    query += " AND title LIKE ?";
    params.push(`%${search}%`);
  }

  query += " ORDER BY created_at DESC";
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch notes" });
    res.json(rows);
  });
});

// Update Note
router.put("/:id", (req, res) => {
  const { title, description, category } = req.body;
  const query = `
        UPDATE notes
        SET title = ?, description = ?, category = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
  db.run(query, [title, description, category, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: "Failed to update note" });
    if (this.changes === 0)
      return res.status(404).json({ error: "Note not found" });
    res.json({ id: req.params.id, title, description, category });
  });
});

// Delete Note
router.delete("/:id", (req, res) => {
  const query = `DELETE FROM notes WHERE id = ?`;
  db.run(query, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: "Failed to delete note" });
    if (this.changes === 0)
      return res.status(404).json({ error: "Note not found" });
    res.status(204).send();
  });
});

module.exports = router;
