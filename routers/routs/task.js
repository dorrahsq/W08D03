const express = require("express");
const taskRouter = express.Router();

const { getAllTasks } = require("./../controllers/task");

taskRouter.get("/", getAllTasks); //not deleted (id for user)

module.exports = taskRouter;
