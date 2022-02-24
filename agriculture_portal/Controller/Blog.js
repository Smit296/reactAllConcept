const Blog = require("../Model/blogmodel");
const BlogController = {};
BlogController.create = function (req, res) {
  Blog.create(
    {
      blogTitle: req.body.blogTitle,
      sourceName: req.body.sourceName,
      imageurl: req.body.imageurl,
      descirption: req.body.descirption,
      like: req.body.like,
      dislike: req.body.dislike,
    },
    function (error, response) {
      if (error) {
        return res.send({
          status: false,
          message: "failed to create",
          error: error,
        });
      }
      return res.json({
        response,
      });
    }
  );
};

BlogController.get = async function (req, res) {
  await Blog.find({}, function (err, event) {
    var blogs = event.map((event) => event.toJSON());

    return res.json({
      data: blogs,
    });
  });
};

BlogController.login = function (req, res) {
  var adminEmail = "aa";
  var password = "aa";
  if (adminEmail === req.body.email && password === req.body.password) {
    res.json({
      flag: true,
    });
  } else {
    res.json({
      flag: false,
    });
  }
};

BlogController.update = function (req, res) {
  var data = req.body;
  Blog.findByIdAndUpdate(
    req.body._id,
    { $set: data },
    { multi: true, new: true },
    function (err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(400).send("No user found");
      }
      res.json({
        user,
      });
    }
  );
};

BlogController.delete = function (req, res) {
  Blog.findOneAndRemove({ _id: req.body._id }, function (err, response) {
    res.json({
      response,
    });
  });
};
module.exports = BlogController;
