import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { NextRequest } from "next/server";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const artists = await prisma.artist.findMany({});
  return res.status(200).json(artists);
}
