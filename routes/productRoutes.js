const { Router } = require("express");
const productController = require("../controllers/productController");
const { checkUser, checkAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", productController.get_products);
router.get("/:id", checkUser, productController.get_product);
router.post("/", checkAdmin, productController.create_product);
router.put("/:id", checkAdmin, productController.update_product);
router.delete("/:id", checkAdmin, productController.delete_product);

module.exports = router;
