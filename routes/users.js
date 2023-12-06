const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCurrentUser,
  updateUser,
  createUser,
  loginUser,
} = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", loginUser);
// router.get("/", getUsers);
// router.patch("/", { new: true, runValidators: true });
// router.get("/:userId", getUser);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;
