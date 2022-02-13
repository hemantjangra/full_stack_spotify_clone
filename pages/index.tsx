import { Box, Text, Image } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import { GradientLayout } from "../components/GradientLayout";
import PrismaClient from "../lib/prisma";

const Home = ({ artists }) => {
  const color = "red";
  return (
    <GradientLayout
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=1000&userId=&cache=v2"
      title="Hemant Kumar"
      subtitle="Profile"
      description="15 playlist and counting"
      color={color}
      roundedImage={true}
    >
      <Box color={"white"} paddingX={"40px"}>
        <Box paddingLeft="35px" paddingBottom="20px">
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Top artists this month
          </Text>
          <Text fontSize={"md"}>Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box
              bg={`${color}.800`}
              key={artist.id}
              marginX="30px"
              borderRadius={"3px"}
            >
              <Image
                src="https://placekitten.com/300/300"
                alt="artist"
                borderRadius="100%"
                padding={"10px"}
              />
              <Box marginY="30px" textAlign="left" paddingLeft="5px">
                <Text fontSize={"small"} fontWeight={700}>
                  {artist.name}
                </Text>
                <Text fontSize="x-small">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await PrismaClient.artist.findMany({});
  return {
    props: {
      artists,
    },
  };
};
export default Home;
