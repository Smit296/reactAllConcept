const UserProduct = require('../Model/ConnectProduct');
const express = require("express");
const router = express.Router();
const Product = require('../Model/Product');

// Create Operation
router.post('/', async (req, res) => {
  try {
    const { body } = req;
    let userproduct = await UserProduct.create(body);
    res.json(userproduct)
  } catch (err) {
    res.json(err)
  }
})

// Read Operation
router.get('/:id', async (req, res) => {
  try {
    let userproduct = await UserProduct.findByPk(req.params.id);
    res.json(userproduct)
  } catch (err) {
    res.json(err)
  }
})

router.get('/product/:userId/:productId', async (req, res) => {
  try {
    let userproduct = await UserProduct.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.productId
      },
      include: [{
        model: Product
      }]
    });

    res.json(userproduct)
  } catch (err) {
    res.json(err)
  }
})

router.get('/user/:userId/:productId', async (req, res) => {
  try {
    let userproduct = await UserProduct.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    });

    res.json(userproduct)
  } catch (err) {
    res.json(err)
  }
})

// Update Operation
router.put('/:id', async (req, res) => {
  try {
    const { params, body } = req;
    let userproduct = await UserProduct.update(body, { where: { id: params.id } });
    res.json(userproduct)
  } catch (err) {
    res.json(err)
  }
})

// Delete Operation
router.delete('/:id', async (req, res) => {
  try {
    const { params } = req;
    let userproduct = await UserProduct.destroy({ where: { id: params.id } });
    res.json(userproduct)
  } catch (err) {
    res.json(err)
  }
})

module.exports = router;