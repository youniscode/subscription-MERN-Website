import express from "express";
import { body, validationResult } from "express-validator";

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

      return res.json({ errors });
    }

    const { email, password } = req.body;
    res.json({
      email,
      password,
    });
  }
);

export default router;
