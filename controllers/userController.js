const User = require("../models/User");

module.exports.get_users = async (req, res) => {
  try {
    const resData = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.get_recent_users = async (req, res) => {
  try {
    const resData = await User.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.get_user = async (req, res) => {
  const { id } = req.params;
  try {
    const resData = await User.findById(id);
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.update_user = async (req, res) => {
  const { id } = req.params;
  try {
    const resData = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.delete_user = async (req, res) => {
  const { id } = req.params;
  try {
    const resData = await User.findByIdAndDelete(id);
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};
