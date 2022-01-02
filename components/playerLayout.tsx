import { Box } from '@chakra-ui/react';
import SideBar from "./sideBar";

const PlayerLayout = ({ children }) =>{
  return(
    <Box width="100vw" height="100vh">
      <Box sx={{position:"absolute", width: "250px", top:"0", left: "0"}}>
        <SideBar />
      </Box>
      <Box sx={{marginLeft: "250px", marginBottom: "100px"}}>
        { children }
      </Box>
      <Box left="0" bottom="0" position="absolute">
        Player
      </Box>
    </Box>
  )
}

export default PlayerLayout;