import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const artists = await prisma.artist.findMany();
    return res.status(200).json(artists);
  }
);
