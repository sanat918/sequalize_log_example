let express = require("express");
let router = express.Router();
let { verifyJWTAdmin } = require("../middleware/auth");
let {
  Signup,
  Login,
  addCategory,
  addProduct,
  addMultipleProducts,
  deleteProduct,
} = require("../controllers/admin.controller");

//add Product
router.post("/signup", Signup);
router.post("/login", Login);

router.post("/addCategory", verifyJWTAdmin, addCategory);
router.post("/addProduct", verifyJWTAdmin, addProduct);
router.post("/addMultipleProduct", verifyJWTAdmin, addMultipleProducts);
router.post("/deleteProduct", verifyJWTAdmin, deleteProduct);

module.exports = router;
