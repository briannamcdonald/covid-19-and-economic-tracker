const express = require('express')
const router  = express.Router()

const data_controller = require("../controller/data.js");

router.post("/", data_controller.create)
router.get("/:type/:location", data_controller.getdata)

module.exports = router