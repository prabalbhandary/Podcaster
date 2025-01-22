const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true
    },
    podcasts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Podcast'
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
