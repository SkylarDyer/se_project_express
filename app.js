const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const { createUser, loginUser } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;
app.use(express.json());

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("Connected to DB");
  },
  (e) => console.log("DB error", e),
);
app.use(cors());
const routes = require("./routes");

app.post("/signin", loginUser);
app.post("/signup", createUser);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
