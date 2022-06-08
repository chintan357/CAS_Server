const { Router } = require("express");
const authController = require("../controllers/authController");
const { checkUser } = require("../middleware/authMiddleware");

const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", checkUser, authController.logout_get);

module.exports = router;
