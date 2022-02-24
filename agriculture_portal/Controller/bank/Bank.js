const Bank = require("../../Model/Bank/Bank");
const BankController = {};
BankController.create = function (req, res) {
  Bank.create(
    {
      bankName: req.body.bankName,
      registrationNumber: req.body.registrationNumber,
      emailid: req.body.emailid,
      password: req.body.password,
      number: req.body.number,
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

BankController.get = async function (req, res) {
  await Bank.find({}, function (err, event) {
    var blogs = event.map((event) => event.toJSON());

    return res.json({
      data: blogs,
    });
  });
};

BankController.login = async function (req, res) {
  console.log(req.body);
  await Bank.findOne(
    {
      $and: [{ emailid: req.body.emailid }, { password: req.body.password }],
    },
    function (err, user) {
      if (err) {
        console.log(err);
      }
      if (!user) {
        flag = false;
      } else {
        flag = true;
      }
      res.json({
        flag: flag,
        user: user,
      });
    }
  );
};

BankController.checkBank = async function (req, res) {
  await Bank.findOne(
    {
      $and: [{ bankName: req.body.bankName }],
    },
    function (err, user) {
      if (err) {
        console.log(err);
      }
      if (!user) {
        flag = false;
      } else {
        flag = true;
      }
      res.json({
        flag: flag,
      });
    }
  );
};

module.exports = BankController;
