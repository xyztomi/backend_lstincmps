const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10
const SECRET_KEY = 'jwt-secret'

const registerUser = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  try {
    const existingUser = await User.findOne({
      where: { username }
    })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      password: hashedPassword
    })

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username },
    });

    console.log(user)

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    const resUser = user.dataValues
    delete resUser.password;
    res
      .status(200)
      .json({ token, data: { ...resUser } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }

}

const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json({ user })

  } catch (err) {
    console.log(err)
    res.status(500).json({ err })
  }
}

module.exports = { registerUser, loginUser, getAllUser }
