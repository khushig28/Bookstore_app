const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10); //10 is solved rounds
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
 
 
    let isAdmin;
    if (email === "khushi+admin@gmail.com"){
      isAdmin = true
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Email or password is not valid");
    }
 
 
 
 
    // Here you'll check if the password matches the stored password hash
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({ isAdmin, message: "Login successful" });
        } else {
      res.status(401);
      throw new Error("Email or password is not valid");
    }
  } catch (error) {
    // Handle any errors that occur in the try block
    console.error(error);
    res.status(500).json({ error: error.message });
  }
 });
 


//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };