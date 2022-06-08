const { Router } = require("express");
const feedbackController = require("../controllers/feedbackController");
const { checkUser, checkAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", checkAdmin, feedbackController.get_feedbacks);
router.get("/:id", checkUser, feedbackController.get_feedback);
router.post("/", feedbackController.create_feedback);
router.delete("/:id", checkAdmin, feedbackController.delete_feedback);

module.exports = router;
