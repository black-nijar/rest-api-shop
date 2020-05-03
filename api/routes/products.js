const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: `GET products` });
});

router.post("/", (req, res, next) => {
  res.status(200).json({ msg: `POST products` });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.id;
  if (id === "special") {
    res.status(200).json({ msg: ` your special id` });
  } else {
    res.status(200).json({ msg: "you pass on id" });
  }
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({ msg: 'Update prduct'})
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({ msg: 'DElete prduct'})
});

module.exports = router;
