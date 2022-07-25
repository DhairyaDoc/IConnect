const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const router = require("./router");

const { appPort, appURL } = require("./config/app");

const app = express();

mongoose.connect(appURL);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB!");
});

mongoose.connection.on("error", (err) => {
  console.log(`Error occurred while connecting to MongoDB: ${err}`);
});

const PORT = process.env.PORT || appPort;

require("./models/user");

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
module.exports = app;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(`Error ocurred ${err}`);
    } else {
      console.log(`Running on port ${PORT}`);
    }
  });
}
