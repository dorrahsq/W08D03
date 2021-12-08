const express = require("express");
const taskRouter = express.Router();
const authentication = require("./../middleWhere/authentication");
const authorization = require("./../middleWhere/authorization");



const { getAllTasks, getAllDeletedTasks , getTask , createTask , updateTask ,deleteTask , completeTask , unCompleteTask } = require("./../controllers/task");

taskRouter.get("/:id" ,authentication, getAllTasks); //not deleted (id for user) ----------
taskRouter.get("/deltedTasks", authentication,  getAllDeletedTasks); // deleted 
taskRouter.get("/one", authentication,  getTask); // by id
taskRouter.post("/create", authentication ,  createTask); //---------
taskRouter.put("/update", authentication  ,   updateTask); //--------
taskRouter.put("/delete", authentication  , deleteTask); // by id -----------
taskRouter.put("/complete"  ,authentication,  completeTask); //---------
taskRouter.put("/inComplete"  ,authentication,  unCompleteTask); //----------

module.exports = taskRouter;
