import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("The email is invalid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("The password is too short"),
  async (req, res) => {
    const validationErrors = validationResult(req);

    // Catching the errors then getting an array then send back the errors message as respond
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });

      return res.json({ errors, data: null });
    }

    const { email, password } = req.body;

    // get the email from the request body
    const user = await User.findOne({ email });

    // if email exist send this message
    if (user) {
      return res.json({
        error: [
          {
            msg: "Email already exist",
          },
        ],
        data: null,
      });
    }

    
// crypt the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.json(user);
  }
);

export default router;
