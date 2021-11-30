const express = require("express");
const taskRouter = express.Router();

const { getAllTasks, getAllDeletedTasks , getTask , createTask , updateTask ,deleteTask } = require("./../controllers/task");

taskRouter.get("/", getAllTasks); //not deleted (id for user)
taskRouter.get("/deltedTasks", getAllDeletedTasks); // deleted
taskRouter.get("/one", getTask); // by id
taskRouter.post("/create", createTask);
taskRouter.put("/update", updateTask);
taskRouter.delete("/delete", deleteTask); // by id

module.exports = taskRouter;
