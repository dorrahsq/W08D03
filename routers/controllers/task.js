const taskModel = require("./../../db/models/task");
const roleModel = require("./../../db/models/role");

//get all not deleted todos for one user
const getAllTasks = async (req, res) => {
  const reqUserId = req.params;
  console.log(reqUserId.id, "thhattttttttt");
  // console.log(reqUserId.reqUserId , "thisssss");
  const userId = req.token.role;
  const Result = await roleModel.findById(userId);

  // const { user } = req.body;
  taskModel
    .find({ isDeleted: false })
    .populate("user")
    .where("user")
    .equals(reqUserId.id)
    .exec(function (err, todos) {
      // console.log(todos[0].user._id);

      if (!todos) {
        return res.status(404).json("you dont have an account");
      }
      if (todos.length) {
        if (todos[0].user._id == reqUserId.id || Result.role === "admin") {
          // if (!todos.length) {
          //   return res.json("you dont have any task"); //status 40.. ??
          // }
          if (err) return handleError(err);
          res.json(todos);
        } else {
          return res.status(403).json({ message: "forbidden" });
        }
      }
      else {
        res.json([]);
      }
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
      if (!todos) {
        return res.status(404).json("you dont have an account");
      }
      if (!todos.length) {
        return res.json("you dont have any deleted task");
      }
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
        return res.json("this task have been deleted");
      }
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//create new Task by user
const createTask = (req, res) => {
  const { user, name } = req.body;
  const newTask = new taskModel({
    name,
    user,
  });

  newTask
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//update Task
const updateTask = (req, res) => {
  const { _id, newName } = req.body;

  taskModel.findById({ _id }).then((result) => {
    if (result.isDeleted == true) {
      return res.json(
        "you cant update on this task because its have been deleted"
      );
    } else {
      taskModel.updateOne({ _id }, { $set: { name: newName } }, function (err) {
        if (err) return handleError(err);
      });
      taskModel
        .find({ _id })
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((err) => {
          //task id not found
          res.send(err);
        });
    }
  });
};

const completeTask = (req, res) => {
  const { _id } = req.body;
  taskModel
    .findOneAndUpdate({ _id }, { isCompleted: true }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const unCompleteTask = (req, res) => {
  const { _id } = req.body;
  taskModel
    .findOneAndUpdate({ _id }, { isCompleted: false }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



//delete task
const deleteTask = async (req, res) => {
  const reqUserId = req.token.id;
  const userId = req.token.role;
  const Result = await roleModel.findById(userId);

  const { _id } = req.body; //task id
  taskModel.findById({ _id }).then((result) => {
    if (result.user == reqUserId || Result.role === "admin") {
      if (result.isDeleted == true) {
        return res.json("this task already have been deleted");
      } else {
        taskModel.updateOne(
          { _id },
          { $set: { isDeleted: true } },
          function (err) {
            if (err) return handleError(err);
          }
        );
        taskModel
          .find({ _id })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            //task id not found
            res.send(err);
          });
      }
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  });
};

module.exports = {
  getAllTasks,
  getAllDeletedTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  unCompleteTask
};
