import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { artistsData } from "./songsData";

const prismaClient = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prismaClient.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              duration: song.duration,
              name: song.name,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prismaClient.user.upsert({
    where: { email: "test@user.com" },
    update: {},
    create: {
      email: "test@user.com",
      password: bcrypt.hashSync("password", salt),
      firstName: "hemant",
      lastName: "kumar",
    },
  });

  const songs = await prismaClient.song.findMany({});
  await Promise.all(
    new Array(10).fill(1).map(async (_, index) => {
      await prismaClient.playlist.create({
        data: {
          name: `Playlist #${index + 1}`,
          user: {
            connect: {
              id: user.id,
            },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
};

run()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => await prismaClient.$disconnect);
