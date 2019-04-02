const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    duration: Number,
    listenings: Number,
    likes : Number,
    featuring: [{ type: Schema.Types.ObjectId, ref: 'artist' }],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('track', trackSchema);
