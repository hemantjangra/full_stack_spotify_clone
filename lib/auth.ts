import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;
    if (token) {
      try {
        const { email } = jwt.verify(token, "salted");
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          return handler(req, res, user);
        }
        throw new Error("user not allowed");
      } catch (e) {
        res.status(400).json({ error: "Not Authorized" });
        return;
      }
    }
    res.status(400).json({ error: "Not Authorized" });
  };
};

export const validateUser = (token) => {
  const user = jwt.verify(token, "salted");
  return user;
};
