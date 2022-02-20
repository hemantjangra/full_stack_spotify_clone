import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { validateUser } from "../../lib/auth";

const Playlist = ({ playlist }) => {
  console.log("playlist props data are", playlist);
  return <p>this page us tge playlist page</p>;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = validateUser(req.cookies.TRAX_ACCESS_TOKEN);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist },
  };
};

export default Playlist;
