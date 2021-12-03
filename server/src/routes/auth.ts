import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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

    // creating the token
    const token = await JWT.sign(
      { email: newUser.email },
      process.env.JWT_SECRET as string,
      //Specify when this token expire
      {
        expiresIn: 370000,
      }
    );

    // Return back data
    res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      },
    });
  }
);
// Creating a request for login in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validating if the user even exisit with that email
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      error: [
        {
          msg: "Invalids credentials",
        },
      ],
      data: null,
    });
  }

  // compare the password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      errors: [
        {
          msg: "Invalids credentials",
        },
      ],
      data: null,
    });
  }

  // creat the token
  const token = await JWT.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    //Specify when this token expire
    {
      expiresIn: 370000,
    }
  );

  return res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    },
  });
});

export default router;
