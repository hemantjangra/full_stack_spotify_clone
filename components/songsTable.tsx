import { FC } from "react";
import { Box } from "@chakra-ui/layout";
import { Table, Thead, Tr, Td, Tbody, IconButton } from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { Song } from "@prisma/client";
import { formatDate } from "../lib/formatter";
import { useStoreActions } from "easy-peasy";

interface ISongsTable {
  songs: Song[];
}

export const SongsTable: FC<ISongsTable> = ({ songs }) => {
  const playSongs = useStoreActions((state: any) => state.changeActiveSongs);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg={"transparent"} color="white">
      <Box padding={"20px"} marginBottom="20px">
        <IconButton
          aria-label={"play"}
          icon={<BsFillPlayFill fontSize="30px" />}
          colorScheme="green"
          fontSize="lg"
          isRound
          onClick={() => handlePlay()}
        />
      </Box>
      <Table variant="unstyled">
        <Thead borderBottom="1px solid" borderColor="rgba(255,255,255, 0.2)">
          <Tr>
            <th>#</th>
            <th>TITLE</th>
            <th>DATE ADDED</th>
            <th align={"center"}>
              <AiFillClockCircle />
            </th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((song, index) => (
            <Tr
              key={song.id}
              sx={{
                transition: "all .3s ",
                "&:hover": {
                  bg: "rgba(255,255,255, 0.1)",
                },
              }}
              cursor="pointer"
              onClick={() => handlePlay(song)}
            >
              <Td textAlign={"center"}>{index + 1}</Td>
              <Td textAlign={"center"}>{song.name}</Td>
              <Td textAlign={"center"}>{formatDate(song.createdAt)}</Td>
              <Td textAlign={"center"}>{song.duration}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
