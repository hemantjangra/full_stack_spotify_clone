import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/layout';
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite
} from 'react-icons/md';

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/"
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search"
  },
  {
    name: "Library",
    icon: MdLibraryMusic,
    route: "/library"
  }
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/'
  },
  {
    name: 'Liked songs',
    icon: MdFavorite,
    route: '/favorites'
  }
]

const playlists = new Array(30).fill(1).map((_, i)=>`Playlist_${i}`);

const SideBar = () => {
  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px">
      <Box width="120px" marginBottom="20px" paddingX="20px">
        <NextImage src="/logo.svg" alt="logo" height={60} width={120}/>
      </Box>
      <Box marginBottom="20px">
        <List spacing={2}>
          {navMenu.map(menu => (
              <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={menu.icon} color="white" marginRight="20px" />
                      { menu.name }
                    </LinkOverlay>
                    </NextLink>
                </LinkBox>
              </ListItem>
            )
          )}
        </List>
      </Box>
      <Divider />
      <Box marginY="20px">
        <List spacing={2}>
          {musicMenu.map(menu => (
              <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={menu.icon} color="white" marginRight="20px" />
                      { menu.name }
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            )
          )}
        </List>
      </Box>
      <Divider color="grey.800" />
      <Box marginY="20px" height="66%" overflow="auto">
        <List>
          {
            playlists.map(playlist =>(
              <ListItem key={ playlist }>
                <LinkBox>
                  <NextLink href = "/" passHref>
                    <LinkOverlay marginX="20px" fontSize="12px" color="white">
                      { playlist }
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Box>
  )
}

export default SideBar;