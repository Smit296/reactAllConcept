const Product = require("../Model/Product");
const express = require("express");
const router = express.Router();

// Create Operation
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    let product = await Product.create(body);
    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

// Read All Operation
router.get("/", async (req, res) => {
  try {
    let product = await Product.findAll();
    res.json(product);
  } catch (err) {
    res.json(err);
  }
});
//Read operation for seed and pestisides
router.get("/selectseed/:offset", async (req, res) => {
  try {
    let product = await Product.findAll({
      offset: req.params.offset, limit: 3 ,
      where: {
        productType: ["Seed", "Pesticides"],
      },
    });

    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

//Read operation for tractor and hasvestor
router.get("/selectmachine/:offset", async (req, res) => {
  try {
    let product = await Product.findAll({
      offset: req.params.offset, limit: 3 ,
      where: {
        productType: ["Tractor", "Pesticider"],
      }
    },{ offset: 1, limit: 5 });

    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

//Read operation for seed and pestisides
router.get("/grain/:offset", async (req, res) => {
  try {
    let product = await Product.findAll({
      offset: req.params.offset, limit: 3 ,
      where: {
        productType: ["grain"],
      },
    });

    res.json(product);
  } catch (err) {
    res.json(err);
  }
});
// Read One Operation
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findByPk(id);
    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

// Update Operation
router.put("/:id", async (req, res) => {
  try {
    const { params, body } = req;
    let product = await Product.update(body, { where: { id: params.id } });
    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

// Delete Operation
router.delete("/:id", async (req, res) => {
  try {
    const { params } = req;
    let product = await Product.destroy({ where: { id: params.id } });
    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
