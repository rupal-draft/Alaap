import { comparePassword, hashPassword } from "../Helpers/auth.js";
import User from "../Model/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const register = async (_, { name, email, password }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!email) {
    throw new Error("Email is required");
  }
  if (!password || password.length < 6) {
    throw new Error("Password is required and should be 6 characters long");
  }

  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error("Email is taken");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  return { ok: true };
};

const login = async (_, { email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { error: "No user found" };
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return { error: "Wrong password" };
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "180d",
    });
    user.password = undefined;
    return { token, user };
  } catch (err) {
    console.log(err);
    throw new Error("Error. Try again.");
  }
};

const forgotPassword = async (_, { email }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return { Status: "No User found" };

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "180d",
    });

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

    await transporter.sendMail(mailOptions);
    return { Status: "Success" };
  } catch (err) {
    console.error(err);
    throw new Error("Error. Try again.");
  }
};

const resetPassword = async (_, { id, token, password }) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Invalid token");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
    return { Status: "Success" };
  } catch (err) {
    console.error(err);
    throw new Error("Error. Try again.");
  }
};

export const currentUser = async (_, __, { req, userId }) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("No user found");
    }
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      about: user.about,
      photo: user.photo,
      coverphoto: user.coverphoto,
      following: user.following,
      followers: user.followers,
      notifications: user.notifications,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const authResolver = {
  Query: {
    currentUser,
  },
  Mutation: {
    register,
    login,
    forgotPassword,
    resetPassword,
  },
};

export default authResolver;
