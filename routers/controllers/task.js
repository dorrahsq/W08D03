const taskModel = require("./../../db/models/task");

//get all not deleted todos for one user
const getAllTasks = (req, res) => {
  const { user } = req.body;

  taskModel
    .find({ isDeleted: false })
    .populate("user")
    .where("user")
    .equals(user)
    .exec(function (err, todos) {
      if (!todos) {
        return res.status(404).json("you dont have an account");
      }
      if (!todos.length) {
        return res.json("you dont have any task"); //status 40.. ??
      }
      if (err) return handleError(err);
      res.json(todos);
    });
};

//get all deleted todos for one user
const getAllDeletedTasks = (req, res) => {
  const { user } = req.body;
  taskModel
    .find({ isDeleted: true })
    .populate("user")
    .where("user")
    .equals(user)
    .exec(function (err, todos) {
      if (err) return handleError(err);
      res.json(todos);
    });
};

//get one task
const getTask = (req, res) => {
  const { _id } = req.body; //task id
  taskModel
    .findById({ _id })
    .then((result) => {
      if (result.isDeleted == true) {
        return res.json("this task is deleted");
      }
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};



module.exports = {
  getAllTasks,
  getAllDeletedTasks,
  getTask,

};
