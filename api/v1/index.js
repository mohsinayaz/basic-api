const express = require("express");
var notesRouter = express.Router();
const mongoose = require("mongoose");
const NoteModel = require("../../db/models/note.model");

notesRouter.get("/", (request, response) => {
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
  NoteModel.find({}, (err, notes) => {
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
notesRouter.post("/", (request, response) => {
  const newNote = new NoteModel(request.body);
  newNote.save().then((savedNotes) => {
    response.json({
      note: savedNotes,
      success: true,
    });
  });
});

/**
 * Get Note By Id
 */
notesRouter.get("/:id", (request, response) => {
  const noteId = request.params.id;
  NoteModel.findById(noteId, (err, note) => {
    if (err) {
      return console.log(err);
    }
    if (!note) {
      return response.status(404).json({
        message: "note not found",
      });
    }
    response.json({
      reply: "note by id sucess",
      note,
    });
  });
});

/**
 * Delete Note By Id
 */
notesRouter.delete("/:id", (request, response) => {
  const noteId = request.params.id;
  NoteModel.findByIdAndRemove(noteId, (err, res) => {
    console.log(err, res);
    if (err) {
      return console.log(err);
    }
    if (!res) {
      return response.status(404).json({
        message: "note not found for deletion",
      });
    }
    response.json({
      reply: "notes deleted successfully",
    });
  });
});

/**
 * Update Note By Id
 */
notesRouter.put("/:id", (request, response) => {
  const noteId = request.params.id;
  const updatedNote = request.body;
  NoteModel.findByIdAndUpdate(noteId, updatedNote, (err, res) => {
    console.log(err, res);
    if (err) {
      return console.log(err);
    }
    if (!res) {
      return response.status(404).json({
        message: "note not found for updating",
      });
    }
    response.json({
      reply: "notes update successfully",
      note: updatedNote,
    });
  });
});

module.exports = {
  notesRouter,
};
