const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("Connected to DB");
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");
app.use(express.json());
app.use(routes);
app.use((req, res, next) => {
  req.user = {
    _id: "6532fd49c1fb908a3bb91076",
  };
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
