const userModel = require("./../../db/models/user");
require("dotenv").config();

// used to share security information between two parties — a client and a server
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRETKEY;

//bcrypt > library to hash passwords.
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

const signUp = async (req, res) => {
  const { email, password, role } = req.body;
  const saveEmail = email.toLowerCase(); 
  const savePass = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    email: saveEmail,
    password: savePass,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const logIn = (req, res) => {
  const { email, password } = req.body;
  const saveEmail = email.toLowerCase(); 

  userModel
    .findOne({ email: saveEmail })
    .then(async (result) => {
      if (result) {
        if (saveEmail == result.email) {
          //unhash password
          const savePass = await bcrypt.compare(password, result.password); //compare return boolean
          if (savePass) {
            const payload = {
              role: result.role,
            };
            const token = await jwt.sign(payload, SECRETKEY); //options
            res.status(200).json({ result, token });
          } else {
            res.status(400).json("invalid email or password");
          }
        } else {
          res.status(400).json("invalid email or password");
        }
      } else {
        res.status(404).json("not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { signUp, logIn };
