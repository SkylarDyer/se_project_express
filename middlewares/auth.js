const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED).send({ message: "Authorization error" });
};

module.exports = (req, res, next) => {
  // get auth from the header
  const { authorization } = req.headers;

  // check header exists and starts with "Bearer"
  if (!authorization || !authorization.startsWith("Bearer")) {
    return handleAuthError(res);
  }
  // get the token
  const token = authorization.replace("Bearer ", "");
  let payload;

  // verify token
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return handleAuthError(res);
  }

  req.user = payload; // add payload to request object

  return next(); // pass request
};
