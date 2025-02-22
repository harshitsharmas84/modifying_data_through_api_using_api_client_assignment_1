const express = require("express");
const { resolve } = require("path");
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
const app = express();
const port = 3010;

app.use(express.json());

app.use(express.static("static"));

app.post("/menu", async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).send(menuItem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.send(menuItems);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
