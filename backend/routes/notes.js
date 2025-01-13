const express = require("express");
const getUserId = require("../middleware/getUserIdJWT");
const Note = require("../models/Notes");
const router = express.Router();
const {body, validationResult} = require("express-validator");

//ROUTE: Fetching notes of a user using GET: /api/notes/fetchAll
router.get("/fetchAll", getUserId, async (req,res)=>{
    var userId = req.userId; //user Id added using middleware
    var userNotes = await Note.find({user: userId});
    res.json({userNotes});
});

//ROUTE: Adding a note using POST: /api/notes/addNote
router.post("/addNote", getUserId, [
    //Validating the fields
    body('title', 'Title cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty(),
], async (req,res)=>{
    //Check for any error
    var error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error});
    }

    try {
        //Get title & description from the request body & create the corresponding note
        var {title, description} = req.body;
        var note = await Note.create({
            user: req.userId,
            title: title,
            description: description
        });
        res.json({"message": "Note created successfully", note});
    } catch (error) {
        return res.status(500).json({"message": "Internal server error", "error": error.message});
    }
});

//ROUTE: Updating a note using PUT: /api/notes/updateNote/:id
router.put('/updateNote/:id', [
    //Validating the fields - optional() helps to validate only if the field is present in request body
    body('title', 'Title cannot be empty').optional().notEmpty(),
    body('description', 'Description cannot be empty').optional().notEmpty()

], getUserId, async(req,res)=>{
    //Check for any error
    var error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error});
    }

    try {
        //Check note exist
        var noteId = req.params.id;
        var note = await Note.findById(noteId);
        if(!note){
            return res.status(404).json({"message": "Note do not exists"});
        }

        //Validate the user updating the note is the owner of it
        if(note.user.toString() != req.userId){
            return res.status(403).json({"message": "Forbidden access"});
        }

        //Update the note
        var{title, description} = req.body;
        const newNote = {};
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        note = await Note.findByIdAndUpdate(noteId, {$set: newNote}, {new:true})
        return res.json({"message": "Note updated successfully", note});
    } catch (error) {
        return res.status(500).json({"message": "Internal server error", "error": error.message});
    }
});

//ROUTE: Deleting a note using DELETE: /api/notes/deleteNote/:id
router.delete('/deleteNote/:id', getUserId, async (req,res)=>{
    try {
        //Check note exist
        var noteId = req.params.id;
        var note = await Note.findById(noteId);
        if(!note){
            return res.status(404).json({"message": "Note do not exists"});
        }

        //Validate the user updating the note is the owner of it
        if(note.user.toString() != req.userId){
            return res.status(403).json({"message": "Forbidden access"});
        }

        //Delete the note
        note = await Note.findByIdAndDelete(noteId);
        return res.json({"message": "Note deleted successfully", note});
        
    }catch(error){
        return res.status(500).json({"message": "Internal server error", "error": error.message});
    }
});

module.exports = router;