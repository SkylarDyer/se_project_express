const express = require("express");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/users");

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("Connected to DB");
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");

app.use(express.json());
app.use(routes);
app.post("/signin", login);
app.post("/signup", createUser);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
