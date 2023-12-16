const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const opts = { runValidators: true };

const User = require("../models/user");
const {
  BAD_REQUEST,
  DEFAULT_ERROR,
  NOT_FOUND,
  DUPLICATE,
  SUCCESS,
  // UNAUTHORIZED,
  // UNAUTHORIZED,
} = require("../utils/errors");

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!userId) {
      return res.status(NOT_FOUND).send({ message: "User not found" });
    }

    return res.status(SUCCESS).send({ data: user });
  } catch (error) {
    console.error(error);
    return res
      .status(DEFAULT_ERROR)
      .send({ message: "Server error (getCurrentUser)" });
  }
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  // console.log("hi", name, avatar, email, password);
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then(({ name: newName, avatar: newAvatar, email: newEmail }) => {
      console.log("hiiii", newName, newAvatar, newEmail);
      res.send({ name: newName, avatar: newAvatar, email: newEmail });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: err.message,
        });
      } else if (err.code === 11000) {
        console.error("Duplicate key error. Document already exists!");
        res.status(DUPLICATE).send({
          message: "Email already exists in our system.",
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar }, opts },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((userInfo) => res.send({ data: userInfo }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({
          message:
            "There is no user with the requested id, or the request was sent to a non-existent address",
        });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Invalid ID passed.",
        });
      } else if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: "You must enter a valid URL.",
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const loginUser = (req, res) => {
  console.log(req.body);
  const { body } = req;
  User.findUserByCredentials(body.email, body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(BAD_REQUEST).send({ message: "unauthorized login" });
    });
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
};
