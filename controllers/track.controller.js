const Track = require('../models/track.model.js');

// Create and Save a new Track
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    // If title is not present in body reject the request by
    // jsoning the appropriate http code
    return res.status(400).json({
      message: 'Title cannot be empty'
    });
  }

  // Create a new track
  const track = new Track({
    title: req.body.title,
    duration: req.body.duration,
    listenings: req.body.listenings,
    likes: req.body.likes || ''
  });

  // Save Track in the database
  track
    .save()
    .then(data => {
      // we wait for insertion to be complete and we json the newly track integrated
      res.json(data);
    })
    .catch(err => {
      // In case of error during insertion of a new track in database we json an
      // appropriate message
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the Track.'
      });
    });
};


// Retrieve and return all Track from the database.
exports.findAll = (req, res) => {
    Track.find()
    .then(track => {
        console.log(track);
      res.status(200).json(track);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving tracks.'
      });
    });
}; 

// Return 6 Tracks from the database order by most liked
exports.mostLiked = (req, res) => {
  Track.find().limit(6).sort({likes:'desc'})
  .then(track => {
      console.log(track);
    res.status(200).json(track);
  })
  .catch(err => {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving tracks.'
    });
  });
};


// Return total number of listenings 
exports.listenings = (req, res) => {
  Track.aggregate(
    [
       {
         $sum : "$listenings"
       }
    ]
 )
  .then(track => {
      console.log(track);
    res.status(200).json(track);
  })
  .catch(err => {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving tracks.'
    });
  });
};

// Return total number of likes 
exports.likeCount = (req, res) => {
  Track.aggregate(
    [
       {
         $sum : "$likes"
       }
    ]
 )
  .then(track => {
      console.log(track);
    res.status(200).json(track);
  })
  .catch(err => {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving tracks.'
    });
  });
};

// Return average time of all tracks 
exports.avgTime = (req, res) => {
  Track.aggregate(
    [
       {
         $avg : "$duration"
       }
    ]
 )
  .then(track => {
      console.log(track);
    res.status(200).json(track);
  })
  .catch(err => {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving tracks.'
    });
  });
};

// Find a single track with a TrackID
exports.findOne = (req, res) => {
  Track.findById(req.params.id)
    .then(track => {
      if (!tracks) {
        return res.status(404).json({
          message: 'Track not found with id ' + req.params.id
        });
      }
      res.json(tracks);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: 'Track not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Error retrieving track with id ' + req.params.id
      });
    });
};

// Update an track identified by the Id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.status(400).json({
      message: 'title cannot be empty'
    });
  }

  // Find track and update it with the request body
  Track.findByIdAndUpdate(
    req.params.id,
    {
        title: req.body.title,
        duration: req.body.duration,
        listenings: req.body.listenings,
        likes : req.body.likes || ''
        //artist: req.body.artist 
    },
    { new: true }
  )
    .then(tracks => {
      if (!tracks) {
        return res.status(404).json({
          message: 'Track not found with id ' + req.params.id
        });
      }
      res.json(tracks);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: 'Track not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Error updating track with id ' + req.params.id
      });
    });
};

// Delete an Track with the specified TrackID in the request
exports.delete = (req, res) => {
  Track.findByIdAndRemove(req.params.id)
    .then(tracks => {
      if (!tracks) {
        return res.status(404).json({
          message: 'Track not found with id ' + req.params.id
        });
      }
      res.json({ message: 'Track deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.title === 'NotFound') {
        return res.status(404).json({
          message: 'Track not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Could not delete Track with id ' + req.params.id
      });
    });
};
 