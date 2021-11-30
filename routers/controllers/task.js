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
        return res.json("you dont have an account");
      }
      if (!todos.length) {
        return res.json("you dont have any task");
      }
      if (err) return handleError(err);
      res.json(todos);
    });
};

module.exports = {
  getAllTasks,
};
