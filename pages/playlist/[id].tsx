import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { validateUser } from "../../lib/auth";
import { GradientLayout } from "../../components/GradientLayout";
import { SongsTable } from "../../components/songsTable";

const getBackgroundColor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "teal",
    "gray",
    "purple",
    "yellow",
  ];
  return colors[id] || colors[colors.length % id];
};

const Playlist = ({ playlist }) => {
  const color = getBackgroundColor(playlist.id);
  return (
    <GradientLayout
      image={`https://picsum.photos/400?random=${playlist.id}`}
      title={playlist.name}
      description={"playlist"}
      roundedImage={false}
      subtitle={`${playlist.songs.length} count`}
      color={color}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  try {
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
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
};

export default Playlist;
