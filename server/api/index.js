const express = require("express");
const router = express.Router();

const itemsHandler = require("./items.handler");
const itemDetailsHandler = require("./itemDetails.handler");

router.get("/items", itemsHandler);
router.get("/items/:id", itemDetailsHandler);

module.exports = router;
