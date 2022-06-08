const { Router } = require("express");
const userController = require("../controllers/userController");
const { checkUser, checkAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", checkAdmin, userController.get_users);
router.get("/recent", checkAdmin, userController.get_recent_users);
router.get("/:id", userController.get_user);
router.put("/:id", userController.update_user);
router.delete("/:id", checkUser, userController.delete_user);
router.post("/check");

module.exports = router;
