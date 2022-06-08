const Feedback = require("../models/Review");

module.exports.get_feedbacks = async (req, res) => {
  try {
    const resData = await Feedback.find({}).sort({ createdAt: -1 });
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.get_feedback = async (req, res) => {
  const { id } = req.params;
  try {
    const resData = await Feedback.findById(id);
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.create_feedback = async (req, res) => {
  try {
    const resData = await Feedback.create(req.body);
    res.status(201).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.delete_feedback = async (req, res) => {
  const { id } = req.params;
  try {
    const resData = await Feedback.findByIdAndDelete(id);
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json(err);
  }
};
