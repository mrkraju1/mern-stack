const express = require("express");
const router = express.Router();
const User = require("../model/model");
const usersController = require("../controller/controller");

router.get("/", usersController.getAllUsers);
router.post("/", usersController.addUser);
router.get("/:id", usersController.getById);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;