import { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    const playlists = await PrismaClient.playlist.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        name: "asc",
      },
    });
    return res.json(playlists);
  }
);
