const user = require("../models/user");
const { BAD_REQUEST, DEFAULT_ERROR, NOT_FOUND } = require("../utils/errors");

const getUsers = (req, res) => {
  user
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server.", e });
    });
};

const getUser = (req, res) => {
  const userId = req.user._id;
  user
    .findById(userId)
    .orFail()
    .then((user) => res.send(user))
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
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  user
    .create({ name, avatar })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: err.message,
        });
      }
    });
};
module.exports = { getUser, getUsers, createUser };
