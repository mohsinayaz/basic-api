const { response } = require("express");
const express = require("express");
var notesRouter = express.Router();
const mongoose = require("mongoose");
const Note = require("../../db/models/note.model");

notesRouter.get("/", (req, response) => {
  //   const notesData = [
  //     {
  //       text: "Mohsin Ayaz",
  //       link: "https://www.mohsin.com",
  //     },
  //     {
  //       text: "Ahsan Ayaz",
  //       link: "https://www.ahsan.com",
  //     },
  //   ];
  //   res.json({ notes: notesData });

  /**
   * Get All Notes
   */
  Note.find({}, (err, notes) => {
    if (err) {
      return console.log(err);
    }
    response.json({
      notes,
    });
  });
});

/**
 * Add a new note
 */
notesRouter.post("/", (req, response) => {
  const newNote = new Note(req.body);
  newNote.save().then((savedNotes) => {
    response.json({
      notes: savedNotes,
      success: true,
    });
  });
});

/**
 * Get Note By Id
 */
notesRouter.get("/:id", (req, response) => {
  response.json({
    reply: "note by id sucess",
  });
});

/**
 * Delete Note By Id
 */
notesRouter.delete("/:id", (req, response) => {
  response.json({
    reply: "note deleted",
  });
});

module.exports = {
  notesRouter,
};
