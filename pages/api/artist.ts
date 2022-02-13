import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth";
import PrismaClient from "../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const artists = await PrismaClient.artist.findMany();
    return res.status(200).json(artists);
  }
);
