const User = require("../Model/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "agricom";
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

const validateRegisterInput = require("../Validation/register");
const validateLoginInput = require("../Validation/login");

// route for create profile using bycrypt
router.post("/", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(isValid)
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const { body } = req;

    let user = await User.create(body);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

//route for create profile using bycrypt
router.post("/signupBycrpyt", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(isValid)
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { body } = req;
  try {
    await bcrypt.hash(body.password, 10, async function (err, hash) {
      body.password = hash;
      let user = await User.create(body);
      res.json(user);
    });
  } catch (err) {
    res.json(err);
  }
});

router.post("/loginverify", async (req, res) => {
  try {
    const { body } = req;

    let user = await User.findOne({
      where: {
        email: [body.email],
      },
    });

    await bcrypt.compare(body.password, user.password, function (err, result) {
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
});

// Read All Operation
router.get("/", async (req, res) => {
  try {
    let user = await User.findAll();
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);


  //Check Validation
  if (!isValid) {
    return res.status(402).json(errors);
  }


  const { body } = req;
  try {
    let user = await User.findOne({
      where: {
        email: [body.email],
        // password: [body.password],
      },
    });
    if (!user) {
      return res.status(400).json({ email: "User not found" });
    }
    if (user.password !== body.password) {
      return res.status(400).json({ password: "Incorrect Password" });
    }
    let data = user.dataValues;
    console.log("Login BE", data);
    jwt.sign(data, secret, (error, token) => {
      if (error) {
        res.sendStatus(403).json(error);
      } else {
        res.json({
          data,
          token: token,
        });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/tokenverify", (req, res) => {
  const bearer = req.headers["authorization"];
  if (bearer) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, secret, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json(data);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

router.post("/google", async (req, res) => {
  try {
    const { body } = req;

    const [user] = await User.findOrCreate({
      where: { googleId: body.googleId },
      defaults: body,
    });
    const data = user.dataValues;
    console.log("Google BE", data);
    jwt.sign(data, secret, (err, token) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          data,
          token: token,
        });
      }
    });
  } catch (err) {
    res.json(err);
  }
});

// Read One Operation
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findByPk(id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// Update Operation
router.put("/:id", async (req, res) => {
  try {
    const { params, body } = req;
    let user = await User.update(body, { where: { id: params.id } });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// Delete Operation
router.delete("/:id", async (req, res) => {
  try {
    const { params } = req;
    let user = await User.destroy({ where: { id: params.id } });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

//sending mail 
router.get("/order/:email", async (req, res) => {
  try {
    console.log(req.body)
    console.log("hi")
    var smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'agricom.family@gmail.com',
        pass: 'agricom123'
      }
    });
    var mailOptions = {
      to: req.params.email,
      from: 'agricom.family@gmail.com',
      subject: 'Agricom Order Placed',
      text: 'Your order placed successfully.\n\n' +
        'Click on the following link to shop our more amazing products:\n\n' +
        'https://attainu-agricom.herokuapp.com/' + '\n\n' +
        'If you did not have placed ordered, please send a mail to inform Us about this.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
      res.status(200).send({
        info
      })

    })
  }
  catch{

  }
})


//-------------------------------------For User Forgot Password--------------------------------//
router.post("/forget", async (req, res) => {
  try {
    let user = await User.findOne({
      where: { email: req.body.email }
    });
    if (!user) return res.status(403).send("No user found")
    console.log("1", user)
    let resetpasswordtoken = await crypto.randomBytes(20).toString("hex")
    let resetpasswordexpires = Date.now() + 3600000; // 1 hour
    console.log("2", resetpasswordexpires, resetpasswordtoken)

    let updated = await User.update({ resetpasswordexpires, resetpasswordtoken }, { where: { email: req.body.email } });
    console.log("3", updated)
    let smtpTransport = await nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "eagle.ecommerce.app@gmail.com",
        pass: "fKnyKSjgjSPHRkFkdMd!5xDka9cxbxna7Grvv6H7F$t*YY!UCz",
      },
    });
    console.log("4", smtpTransport)
    var mailOptions = {
      to: user.dataValues.email,
      from: "agricom-attainu@gmail.com",
      subject: "Agricom Password Reset",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "http://" +
        req.headers.host +
        "/reset/" +
        resetpasswordtoken +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };
    console.log("5")
    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) res.status(403).json({ error: "smt", msg: err })
      console.log("mail sent");
      res.send("email send")
    });
  }
  catch (err) {
    res.status(403).json({ error: true, msg: err })
  }
});

router.verify = function (req, res) {
  console.log(req.params.token);
  User.findOne(
    {
      where: { resetPasswordToken: req.params.token, }
      // resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        return res.redirect("/forgot");
      }
      res.json({ token: req.params.token });
    }
  );
};
router.token = function (req, res) {
  console.log("reached");
  async.waterfall(
    [
      function (done) {
        User.register.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              return res.redirect("back");
            }
            if (req.body.password === req.body.confirm) {
              user.password = req.body.password;

              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;

              user.save(function (err) {
                req.logIn(user, function (err) {
                  done(err, user);
                });
              });
            } else {
              return res.redirect("back");
            }
          }
        );
      },
      function (user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "eagle.ecommerce.app@gmail.com",
            pass: "fKnyKSjgjSPHRkFkdMd!5xDka9cxbxna7Grvv6H7F$t*YY!UCz",
          },
        });
        var mailOptions = {
          to: user.email,
          from: "learntocodeinfo@mail.com",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          done(err);
        });
      },
    ],
    function (err) {
      res.redirect("/user-login");
    }
  );
};

module.exports = router;
