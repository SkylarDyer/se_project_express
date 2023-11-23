const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

// router.post("/signup", createUser);
router.post("/signin", validateUser);
// router.get("/", getUsers);
router.patch("/", { new: true, runValidators: true });
// router.get("/:userId", getUser);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;
