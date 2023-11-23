const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "This email already exists in our system.",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 8,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "You must enter a valid URL",
    },
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((emailData) => {
      if (!emailData) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, emailData.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        return emailData;
      });
    });
};

module.exports = mongoose.model("users", user);
