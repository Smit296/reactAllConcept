const Company = require("../Model/SellerCompany");
const express = require("express");
const router = express.Router();

// Create Operation
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    let company = await Company.create(body);
    res.json(company);
  } catch (err) {
    res.json(err);
  }
});

// Read Operation
router.get("/", async (req, res) => {
  try {
    let company = await Company.findAll();
    res.json(company);
  } catch (err) {
    res.json(err);
  }
});

// Update Operation
router.put("/:id", async (req, res) => {
  try {
    const { params, body } = req;
    let company = await Company.update(body, { where: { id: params.id } });
    res.json(company);
  } catch (err) {
    res.json(err);
  }
});

// Delete Operation
router.delete("/:id", async (req, res) => {
  try {
    const { params } = req;
    let company = await Company.destroy({ where: { id: params.id } });
    res.json(company);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
