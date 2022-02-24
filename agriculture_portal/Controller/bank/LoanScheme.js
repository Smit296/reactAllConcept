const LoanScheme = require("../../Model/Bank/LoanScheme");
const LoanController = {};
LoanController.create = function (req, res) {
  LoanScheme.create(
    {
      schemeName: req.body.schemeName,
      interestRate: req.body.interestRate,
      maxLimit: req.body.maxLimit,
      documentRequired: req.body.documentRequired,
      description: req.body.description,
      bankName: req.body.bankName,
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

LoanController.get = async function (req, res) {
  await LoanScheme.find({}, function (err, event) {
    var blogs = event.map((event) => event.toJSON());

    return res.json({
      data: blogs,
    });
  });
};

module.exports = LoanController;
