const router = require("express").Router();
const { validateUser } = require("../controllers/users");

// router.post("/signup", createUser);
router.post("/signin", validateUser);
// router.get("/", getUsers);
router.patch("/", { new: true, runValidators: true });
// router.get("/:userId", getUser);

module.exports = router;
