import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    console.log("called endpoint from hook");
    try {
      const playlistCount = await prisma.playlist.count({
        where: {
          userId: user.id,
        },
      });
      res.status(200).json({ ...user, playlistCount });
    } catch (err) {
      console.log("error in me path at server is ", err);
      res.status(400).json({ error: err });
    }
  }
);
