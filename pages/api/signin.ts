import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { email, password } = req.body;
  try {
    const user = await reqToFuncMap[method](email, password);

    const token = jwt.sign(
      {
        id: user.Id,
        email,
        time: Date.now(),
      },
      "salted",
      { expiresIn: "8h" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("TRAX_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: true,
      })
    );

    res.json(sanitizedUser(user));
    return;
  } catch (err) {
    if (err.message == `User with email ${email} already exists`) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(400).json({ error: err });
    return;
  }
}

const sanitizedUser = (user: User): {} => {
  const { password, ...relevantUserDetails } = user;
  return relevantUserDetails;
};

const _postFunc = async (email: string, password: string): Promise<User> => {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser && bcrypt.compareSync(password, existingUser.password)) {
    return existingUser;
  }
  throw new Error("Username or password is wring");
};
const _getFunc = async (req: NextApiRequest, res: NextApiResponse) => {
  throw new Error("Not implemented");
};

const reqToFuncMap = {
  GET: _getFunc,
  POST: _postFunc,
};
