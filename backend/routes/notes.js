const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

// Models
const Note = require("../models/Note");

// Route - 1: Get all notes - 'api/notes/fetchNotes'
router.get("/fetchNotes", fetchUser, async (req, res) => {
  try {
    // Fetch all the notes through users id
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route - 2: Add a new note - '/api/notes/addNote'
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body(
      "description",
      "Description must be 10 to 15 characters long"
    ).isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Check for the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Creating a new note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // Save the note
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route - 3: Update a note - 'api/notes/updateNote/:id'
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote object
    const newNote = {};
    // If title gets updated
    if (title) {
      newNote.title = title;
    }
    // If description gets updated
    if (description) {
      newNote.description = description;
    }
    // If tag gets updated
    if (tag) {
      newNote.tag = tag;
    }

    // Find note by id
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found!!");
    }

    // Allow updation only if the user is the owner of this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You can only update your note.");
    }

    // Find Note by id and update
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note: note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route - 4: Delete a note - 'api/notes/deleteNote/:id'
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    // Find note by id
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found!!");
    }

    // Allow deletion only if the user is the owner of this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You can only update your note.");
    }

    // Find Note by id and update
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
