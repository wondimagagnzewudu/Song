const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Create a new song
router.post('/', async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});

// List all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).send(songs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a song
router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!song) {
      return res.status(404).send();
    }
    res.status(200).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).send();
    }
    res.status(200).send(song);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
