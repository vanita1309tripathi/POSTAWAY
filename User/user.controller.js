import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail
} from "./user.repo.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, gender } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      gender
    });

    res.status(201).json({ msg: "User created", user: newUser });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    // Creating a JWT token , sign takes 3 parameters:payload,secret key and expiry
    const token = jwt.sign({ _id: user._id, userType: "user" }, process.env.JWT_SECRET || "POSTAWAY_SECRET", {
      expiresIn: "10h"
    });
    // Server (Express app)-	Your backend API that sends responses
    // Express sends that token to the browser as a cookie:
    //  Setting the JWT in a Cookie
    res.cookie("jwtToken", token, { httpOnly: true, maxAge: 36000000 });
    res.json({ msg: "Login successful", token });
  } catch (err) {
    next(err);
  }
};
