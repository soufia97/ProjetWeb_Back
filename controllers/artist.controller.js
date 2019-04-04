const Artist = require('../models/artist.model.js');
var _ = require('lodash');

// Create and Save a new Artist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    // If firstName is not present in body reject the request by
    // jsoning the appropriate http code
    return res.status(400).json({
      message: 'first name can not be empty'
    });
  }

  // Create a new artist
const artist = new Artist({
  name: req.body.name,
  birth: req.body.birth,
  //album: req.body.album
  followers: req.body.followers || ''
});


  // Save Artist in the database
  artist
    .save()
    .then(data => {
      // we wait for insertion to be complete and we json the newly artist integrated
      res.json(data);
    })
    .catch(err => {
      // In case of error during insertion of a new artist in database we json an
      // appropriate message
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the Artist.'
      });
    });
};

// Retrieve and return all Artists from the database.
exports.findAll = (req, res) => {
    Artist.find({})
    .then(artistes => {
        console.log(artistes);
      res.status(200).json(artistes);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving artists.'
      });
    });
}; 

// Return 3 Artists from the database order by number of followers.
exports.topFollowers = (req, res) => {
  Artist.find({}).limit(3).sort({followers : 'desc'})
  .then(artistes => {
      console.log(artistes);
    res.status(200).json(artistes);
  })
  .catch(err => {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving artists.'
    });
  });
};

// Return artists order by name
exports.artistSort = (req, res) => {
  Artist.find({}).sort({name : 'asc'})
  .then(artistes => {
      console.log(artistes);
    res.status(200).json(artistes);
  })
  .catch(err => {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving artists.'
    });
  });
};

// Find a single artist with a artistId
exports.findOne = (req, res) => {
  Artist.findById(req.params.id)
    .then(artistes => {
      if (!artistes) {
        return res.status(404).json({
          message: 'Artist not found with id ' + req.params.id
        });
      }
      res.json(artistes);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: 'Artist not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Error retrieving artist with id ' + req.params.id
      });
    });
};

// Update an Artist identified by the Id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).json({
      message: 'first name cannot be empty'
    });
  }

  // Find artist and update it with the request body
  Artist.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        birth: req.body.birth,
        followers: req.body.birth || ''
        //album: req.body.album 
    },
    { new: true }
  )
    .then(artistes => {
      if (!artistes) {
        return res.status(404).json({
          message: 'Artist not found with id ' + req.params.id
        });
      }
      res.json(artistes);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: 'Artist not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Error updating artist with id ' + req.params.id
      });
    });
};

// Delete a Artist with the specified ArtistId in the request
exports.delete = (req, res) => {
  Artist.findByIdAndRemove(req.params.id)
    .then(artistes => {
      if (!artistes) {
        return res.status(404).json({
          message: 'Artist not found with id ' + req.params.id
        });
      }

      //Remove from "db"
      //_.remove(artistes, ["id", id])

      //Return message
      res.json({ message: 'Artist deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).json({
          message: 'Artist not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Could not delete Artist with id ' + req.params.id
      });
    });
};
