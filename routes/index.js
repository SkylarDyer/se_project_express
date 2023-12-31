const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");

const clothingItem = require("./clothingItem");
const user = require("./users");

router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  console.log(res);
  res.status(NOT_FOUND).send({
    message: "The request was sent to a non-existent address",
  });
});

module.exports = router;
