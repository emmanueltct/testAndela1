import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
import { PayloadAttributes, UserAttributes } from "../types/user.types";

dotenv.config();

const userSignup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const newUser: UserAttributes = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    if (newUser) {
      const payload: PayloadAttributes = {
        id: newUser.id as string,
        email: newUser.email as string
      };
      const token: string = jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.JWT_EXPIRE
        }
      );
      return res
        .status(201)
        .json({ message: "user is successfuly signed up", token });
    }
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export { userSignup };
