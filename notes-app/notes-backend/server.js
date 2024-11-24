const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const notesRoutes = require("./routes/notes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/notes", notesRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
