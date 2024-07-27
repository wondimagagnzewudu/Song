const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Get statistics
router.get('/', async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist').then(artists => artists.length);
    const totalAlbums = await Song.distinct('album').then(albums => albums.length);
    const totalGenres = await Song.distinct('genre').then(genres => genres.length);

    const songsByGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } }
    ]);

    const songsByArtist = await Song.aggregate([
      { $group: { _id: '$artist', songs: { $push: '$$ROOT' }, albums: { $addToSet: '$album' } } },
      { $project: { artist: '$_id', _id: 0, songsCount: { $size: '$songs' }, albumsCount: { $size: '$albums' } } }
    ]);

    const songsByAlbum = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } }
    ]);

    res.status(200).send({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsByGenre,
      songsByArtist,
      songsByAlbum
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
