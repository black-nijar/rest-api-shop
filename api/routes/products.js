const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const Product = require("../models/product");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname)
  }
})
 
var upload = multer({ storage: storage })

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/products/" + doc._id,
            },
          };
        }),
      };
      //  if (docs.length >= 0) {
      res.status(200).json(response);
      //  } else {
      //    res.status(404).json({ msg: 'No entries found '})
      //  }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", upload.single("productImage"), (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        msg: "Created product Successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:5000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:5000/products",
          },
        });
      } else {
        res.status(404).json({ msg: "no valid id for this id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        msg: "Product Updated",
        request: {
          type: "GET",
          url: "http://localhost:5000/products/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        msg: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:5000/products/",
          data: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  res.status(200).json({ msg: "DElete prduct" });
});

module.exports = router;
