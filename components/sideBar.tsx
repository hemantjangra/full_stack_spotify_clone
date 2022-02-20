import NextImage from "next/image";
import NextLink from "next/link";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

import { usePlaylists } from "../lib/hooks";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Liked songs",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const SideBar = () => {
  const { playlists, isError, isLoading } = usePlaylists();
  console.log("calling the playlist hook");
  console.log("playlist data is ", playlists);
  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px">
      <Box width="120px" marginBottom="20px" paddingX="20px">
        <NextImage src="/logo.svg" alt="logo" height={60} width={120} />
      </Box>
      <Box marginBottom="20px">
        <List spacing={2}>
          {navMenu.map((menu) => (
            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
              <LinkBox>
                <NextLink href={menu.route} passHref>
                  <LinkOverlay color="white">
                    <ListIcon as={menu.icon} color="white" marginRight="20px" />
                    {menu.name}
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box marginY="20px">
        <List spacing={2}>
          {musicMenu.map((menu) => (
            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
              <LinkBox>
                <NextLink href={menu.route} passHref>
                  <LinkOverlay color="white">
                    <ListIcon as={menu.icon} color="white" marginRight="20px" />
                    {menu.name}
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider color="grey.800" />
      <Box marginY="20px" height="66%" overflow="auto">
        <List>
          {playlists &&
            playlists.map(({ id, name }) => (
              <ListItem key={id}>
                <LinkBox>
                  {/*<NextLink href={`/playlist/${id}`} passHref>*/}
                  <NextLink
                    href={{
                      pathname: "/playlist/[id]",
                      query: { id },
                    }}
                    passHref
                  >
                    <LinkOverlay marginX="20px" fontSize="12px" color="white">
                      {name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
