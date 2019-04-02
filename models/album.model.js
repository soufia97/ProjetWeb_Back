const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    release : String,
    genre : String,
    cover_url : String,
    track: [{ type: Schema.Types.ObjectId, ref: 'track' }],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('album', albumSchema);
