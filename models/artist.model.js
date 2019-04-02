const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    birth: String,
    followers: Number,
    album: [{ type: Schema.Types.ObjectId, ref: 'album' }],
  },
  {
    //timestamps: true,
    collection: 'artist'
  }
);

module.exports = mongoose.model('artist', artistSchema);
