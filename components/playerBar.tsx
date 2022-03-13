import { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import { Player } from "./player";

export interface IPlayerBar {}

export const PlayerBar: FC<IPlayerBar> = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Flex align="center">
      <Box width="30%" color="white" padding="10px">
        <Text fontSize="large">{activeSong?.name}</Text>
        <Text fontSize="small">{activeSong?.artist?.name}</Text>
      </Box>
      <Box width="40%">
        <Player songs={songs} activeSong={activeSong} />
      </Box>
      <Box width="30%">last column</Box>
    </Flex>
  );
};
