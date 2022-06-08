const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

// controller actions

module.exports.get_products = async (req, res) => {
  try {
    const resData = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.get_product = async (req, res) => {
  const { id } = req.params;
  try {
    const resData = await Product.findById(id);
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.create_product = async (req, res) => {
  let { name, price, desc, imgUrl, stock, available } = req.body;
  available = available === "true" ? true : false;
  try {
    const product = await Product.create({
      name,
      price,
      desc,
      imgUrl,
      stock,
      available,
    });
    res.status(201).json({ product: product._id });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.update_product = async (req, res) => {
  const { id } = req.params;
  try {
    const resData = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.delete_product = async (req, res) => {
  const { id } = req.params;
  try {
    const resData = await Product.findByIdAndDelete(id);
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};
