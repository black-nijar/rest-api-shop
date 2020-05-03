const express = require("express");
const router = express.Router();
const Order = require("../models/orders");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "orders were fetched" });
});

router.post("/", (req, res, next) => {
  const order = new Order({
    _id: mongoose.Schema.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId,
  });
  order
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  res.status(201).json({ msg: "orders was created", order: order });
});

router.get("/:orderId", (req, res, next) => {
  res.status(200).json({ msg: "order", orderId: req.params.orderId });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({ msg: "order deleted", orderId: req.params.orderId });
});

module.exports = router;
