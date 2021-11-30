const express = require("express");
const userRouter = express.Router();

const { signUp, logIn } = require("./../controllers/user");

userRouter.post("/create", signUp);
userRouter.post("/log", logIn); // post for security -- post is more secure than get

module.exports = userRouter;
