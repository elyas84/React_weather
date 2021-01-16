require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || PORT;

const path = require("path");

app.use(express.json());




if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "frontend", "build", "index.html")); //relative path
  });
}

app.listen(PORT, (req, res) => {
  console.log("server is running on port " + PORT);
});
