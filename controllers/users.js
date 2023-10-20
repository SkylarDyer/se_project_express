const user = require("../models/user");

const getUsers = (req, res) => {
  user
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getUsers", e });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  user
    .findById(userId)
    .orFail()
    .then((item) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getUser", e });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  user
    .create({ name, avatar })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createUser", e });
    });
};

module.exports = { getUser, getUsers, createUser };
