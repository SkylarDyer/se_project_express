const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createUser, loginUser } = require("./controllers/users");

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
app.post("/signin", loginUser);
app.post("/signup", createUser);
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
