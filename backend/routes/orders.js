var express = require('express');
var router = express.Router();

const OrderModel = require('../models/orders');
const ProductModel = require('../models/products');

/* GET all orders. */
router.get('/all', async (req, res, next) => {
  const orders = await OrderModel.find()
  res.status(200).json(orders)
});

/* POST order with specific user */
router.post('/add', async (req, res, next) => {
  const order = await OrderModel.create(req.body)
  const products = order.products;

// reduce the 'lager' in ProductModel depends on quantity from the OrderModel
  products.forEach(async ({productId, quantity}) => {
    const product = await ProductModel.findById({_id: productId});
    if (product){
      product.lager -= quantity;
      await product.save();
    }
  })
})
module.exports = router;
