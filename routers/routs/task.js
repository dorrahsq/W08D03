const express = require("express");
const taskRouter = express.Router();

const {
  getAllTasks,
  getAllDeletedTasks,
  getTask,
} = require("./../controllers/task");

taskRouter.get("/", getAllTasks); //not deleted (id for user)
taskRouter.get("/deltedTasks", getAllDeletedTasks); // deleted
taskRouter.get("/one", getTask); // by id

module.exports = taskRouter;
