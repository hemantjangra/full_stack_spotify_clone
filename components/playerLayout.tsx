import { Box } from "@chakra-ui/react";
import SideBar from "./sideBar";
import { PlayerBar } from "./playerBar";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box sx={{ position: "absolute", width: "250px", top: "0", left: "0" }}>
        <SideBar />
      </Box>
      <Box sx={{ marginLeft: "250px", height: "100vh" }}>{children}</Box>
      <Box
        left="0"
        bottom="0"
        position="absolute"
        width="100vw"
        height="100px"
        bg="gray.900"
      >
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
