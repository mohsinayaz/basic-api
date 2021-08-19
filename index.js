const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
require("./db");

app.use(express.json());
const { notesRouter } = require("./api/v1/index");

app.use(cors());

// root (/)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
