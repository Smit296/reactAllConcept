const Farmer = require("../../Model/Bank/Farmer");
const FarmerController = {};
FarmerController.create = function (req, res) {
  Farmer.create(
    {
      name: req.body.name,
      emailid: req.body.emailid,
      number: req.body.number,
      date: req.body.date,
      addhar: req.body.addhar,
      place: req.body.place,
      bankName: req.body.bankName,
      schemeName: req.body.schemeName,
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

FarmerController.get = async function (req, res) {
  await Farmer.find({}, function (err, event) {
    var blogs = event.map((event) => event.toJSON());

    return res.json({
      data: blogs,
    });
  });
};

FarmerController.delete = function (req, res) {
  Farmer.findOneAndRemove({ _id: req.body._id }, function (err, response) {
    res.json({
      response,
    });
  });
};
module.exports = FarmerController;
