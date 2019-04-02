const Album = require('../models/album.model.js');
var _ = require('lodash');

// Create and Save a new Album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    // If Title is not present in body reject the request by
    // jsoning the appropriate http code
    return res.status(400).json({
      message: 'Title can not be empty'
    });
  }

  // Create a new album
const album = new Album({
  title: req.body.title,
  release: req.body.release,
  genre: req.body.genre,
  cover_url : req.body.cover_url || ''
});


  // Save album in the database
  album
    .save()
    .then(data => {
      // we wait for insertion to be complete and we json the newly album integrated
      res.json(data);
    })
    .catch(err => {
      // In case of error during insertion of a new album in database we json an
      // appropriate message
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the album.'
      });
    });
};

// Retrieve and return all albums from the database.
exports.findAll = (req, res) => {
    Album.find()
    .then(album => {
        console.log(album);
      res.status(200).json(album);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving albums.'
      });
    });
};

// Find a single album with a albumId
exports.findOne = (req, res) => {
  Album.findById(req.params.id)
    .then(album => {
      if (!albums) {
        return res.status(404).json({
          message: 'Album not found with id ' + req.params.id
        });
      }
      res.json(albums);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: 'Album not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Error retrieving album with id ' + req.params.id
      });
    });
};

// Update an Album identified by the Id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.status(400).json({
      message: 'Title cannot be empty'
    });
  }

  // Find album and update it with the request body
  Album.findByIdAndUpdate(
    req.params.id,
    {
        title: req.body.title,
        release: req.body.release,
        genre: req.body.genre || ''
    },
    { new: true }
  )
    .then(albums => {
      if (!albums) {
        return res.status(404).json({
          message: 'Album not found with id ' + req.params.id
        });
      }
      res.json(albums);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: 'Album not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Error updating album with id ' + req.params.id
      });
    });
};

// Delete a album with the specified AlbumID in the request
exports.delete = (req, res) => {
  Album.findByIdAndRemove(req.params.id)
    .then(albums => {
      if (!albums) {
        return res.status(404).json({
          message: 'Album not found with id ' + req.params.id
        });
      }

      //Remove from "db"
      //_.remove(albums, ["id", id])

      //Return message
      res.json({ message: 'Album deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.title === 'NotFound') {
        return res.status(404).json({
          message: 'Album not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Could not delete Album with id ' + req.params.id
      });
    });
};
