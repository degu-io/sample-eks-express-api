const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("🍣 Sushi from Fargate!\n");
});
app.get("/soup", (req, res) => {
  res.send("🥣 Soup from Fargate!\n");
});
app.listen(80, () => {
  console.log("server connected");
});
