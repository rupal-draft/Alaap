import User from "./../Model/user.js";
import { hashPassword, comparePassword } from "./../Helpers/auth.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!email) {
    return res.json({
      error: "Email is required",
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required and should be 6 characters long",
    });
  }
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: "Email is taken",
    });
  }
  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword });
  try {
    await user.save();
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "no user found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "180d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send({ Status: "No User found" });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "180d",
    });
    // console.log(token);//For postman purpose
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Reset your password - Sociofy",
      text: `Dear ${user.name},

      We received a request to reset your password for your Sociofy account. To proceed with this request, please follow the instructions below:
      
        1. Click on the following link to reset your password:
        ${process.env.FRONTEND}/reset-password/${user.id}/${token}
      
        2. If you're unable to click on the link, please copy and paste it into your web browser's address bar.
      
        3. Once the link is opened, you will be directed to a page where you can create a new password for your account.
      
      If you did not request this password reset, please disregard this email. Your account is still secure, and no changes have been made.
      
      Thank you for using Sociofy.
      
      Best regards,
      Sociofy Team`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  } catch (err) {
    console.error(err);
  }
};
export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(400).send("Invalid token");
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
};

export const currentUser = async (req, res) => {
  try {
    if (!req.userID) throw new Error("No user found");
    const user = await User.findById(req.userID);
    res.json({ success: true, user: user });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
