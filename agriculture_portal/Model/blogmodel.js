const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BlogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
    },
    sourceName: {
      type: String,
    },
    imageurl: {
      type: String,
    },
    descirption: {
      type: String,
      default: "true",
    },
    like: {
      type: Number,
    },
    dislike: {
      type: Number,
    },
  },

  {
    collection: "blog",
  }
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
