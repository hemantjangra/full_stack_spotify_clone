import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import prisma from "../../lib/prisma";
import {User} from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { method } = req;
  const { email, password } = req.body;
  try {
    const user = await reqToFuncMap[method](email, password);

    const token = jwt.sign({
      email,
      id: user.id,
      time: Date.now()
    }, 'salted', {
      expiresIn: '8h'
    });
    res.setHeader('Set-Cookie', cookie.serialize('TRAX_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: true
    }));
    return res.json(sanitizeUserData(user));
  }catch(err) {
    if(err.message == `User with email ${email} already exists`){
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(400);
    return;
  }
}

const sanitizeUserData = (data: User) => {
  const {password, ...sanitizedData} = data;
  return sanitizedData;
}

const _postFunc = async (email: string, password: string): Promise<User> =>{
  const existingUser = await prisma.user.findFirst({where: {email}});
  if(existingUser){
    throw new Error(`User with email ${email} already exists`);
    //return res.status(400).json({ "error": "user already exists" });
  }
  const salt = bcrypt.genSaltSync();
  return await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, salt)
    }
  });
}



const _getFunc = async (req: NextApiRequest, res: NextApiResponse) =>{

}

const reqToFuncMap = {
  "GET" : _getFunc,
  "POST": _postFunc
};