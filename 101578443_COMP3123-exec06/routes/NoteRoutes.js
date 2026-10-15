const noteModel = require('../models/NotesModel');
const express = require('express');
const noteRoutes = express.Router();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save

/**
 * TODO - Create a new Note
 * POST /notes
 */
noteRoutes.post('/notes', async (req, res) => {
    try {
        // Validate request
        if (!req.body.noteTitle || !req.body.noteDescription) {
            return res.status(400).send({
                message: "Note title and description cannot be empty"
            });
        }

        // Create a new note
        const note = new noteModel({
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority || 'LOW',
            dateAdded: new Date(),
            dateUpdated: new Date()
        });

        // Save note to MongoDB
        const savedNote = await note.save();

        res.status(201).send(savedNote);

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});



/**
 * TODO - Retrieve all Notes
 * GET /notes
 */
noteRoutes.get('/notes', async (req, res) => {
    try {
        // Retrieve all notes from MongoDB
        const notes = await noteModel.find();

        // Return all notes
        res.status(200).send(notes);

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});



/**
 * TODO - Retrieve a single Note with noteId
 * GET /notes/:noteId
 */
noteRoutes.get('/notes/:noteId', async (req, res) => {
    try {
        // Find note by its MongoDB ID
        const note = await noteModel.findById(req.params.noteId);

        // Check if note exists
        if (!note) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        // Return the note
        res.status(200).send(note);

    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});



/**
 * TODO - Update a Note with noteId
 * PUT /notes/:noteId
 */
noteRoutes.put('/notes/:noteId', async (req, res) => {
    try {
        // Validate request
        if (!req.body.noteTitle || !req.body.noteDescription) {
            return res.status(400).send({
                message: "Note title and description cannot be empty"
            });
        }

        // Update the note using its ID
        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            {
                noteTitle: req.body.noteTitle,
                noteDescription: req.body.noteDescription,
                priority: req.body.priority || 'LOW',
                dateUpdated: new Date()
            },
            {
                new: true,
                runValidators: true
            }
        );

        // Check if note exists
        if (!updatedNote) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        // Return updated note
        res.status(200).send(updatedNote);

    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});



/**
 * TODO - Delete a Note with noteId
 * DELETE /notes/:noteId
 */
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    try {
        // Delete the note using its MongoDB ID
        const deletedNote = await noteModel.findByIdAndDelete(
            req.params.noteId
        );

        // Check if note exists
        if (!deletedNote) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        // Return success message
        res.status(200).send({
            message: "Note deleted successfully"
        });

    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

module.exports = noteRoutes;
