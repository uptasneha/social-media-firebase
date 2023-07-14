import {
  Container,
  Grid,
  GridItem,
  VStack,
  Flex,
  Button,
  Spinner,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import {
  NavMenu,
  TopBar,
  WhoToFollow,
  PostCard,
  MobileMenu,
  AddPost,
} from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getHomePosts,
  showTrendingPost,
  sortPost,
} from '../../features/post/postSlice';

const Home = () => {
  const { currentUser } = useSelector(state => state.user);
  const { homePosts, homeStatus, error, postStatus } = useSelector(
    state => state.post
  );
  const dispatch = useDispatch();
  const filterBtnColor = useColorModeValue(
    'gray.700',
    'rgba(255,255,255,0.92)'
  );
  const bodyBgColor = useColorModeValue('#f7f7f7');

  useEffect(() => {
    dispatch(
      getHomePosts({ uid: currentUser.uid, following: currentUser.following })
    );
  }, [currentUser.following, currentUser.uid, dispatch]);

  const handleTrending = () => {
    dispatch(showTrendingPost());
  };

  const handleSort = sortBy => {
    dispatch(sortPost(sortBy));
  };

  const TrendIcon = () => (
    <span className="material-icons">local_fire_department</span>
  );
  const SortIcon = () => <span className="material-icons">swap_vert</span>;
  return (
    <>
      <Container
        maxWidth="container.xl"
        paddingX={[0, 0, 4]}
        backgroundColor={bodyBgColor}
      >
        <TopBar />
        <Grid
          templateColumns={['1fr', '1fr', '1fr 3fr', '1fr 3fr 2fr']}
          gap={8}
        >
          <GridItem display={['none', 'none', 'block']}>
            <NavMenu />
          </GridItem>
          <GridItem>
            <VStack paddingX={['8px', '8px']}>
              <Flex width="full">
                <Button
                  leftIcon={<TrendIcon />}
                  width="full"
                  borderRadius="full"
                  variant="outline"
                  color={filterBtnColor}
                  border="2px"
                  onClick={handleTrending}
                >
                  Trending
                </Button>
                <Menu>
                  <MenuButton
                    as={Button}
                    width="full"
                    borderRadius="full"
                    variant="outline"
                    color={filterBtnColor}
                    border="2px"
                    flexGrow="0"
                  >
                    <Flex justifyContent="center">
                      <SortIcon />
                      <Text as="span" paddingLeft={2}>
                        Sort by
                      </Text>
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleSort('newest')}>
                      Newest
                    </MenuItem>
                    <MenuItem onClick={() => handleSort('oldest')}>
                      Oldest
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              {error && <Text>{error}</Text>}
              {postStatus === 'loading' && <Spinner size="xl" />}
              {homeStatus === 'loading' ? (
                <Spinner size="xl" />
              ) : (
                <>
                  {homePosts.length > 0 ? (
                    homePosts.map(post => (
                      <PostCard key={post.id} postData={post} />
                    ))
                  ) : (
                    <Text>No post to show</Text>
                  )}
                </>
              )}
            </VStack>
          </GridItem>
          <GridItem
            position="sticky"
            top="74"
            display={['none', 'none', 'none', 'block']}
          >
            <WhoToFollow />
          </GridItem>
        </Grid>
      </Container>
      <Box display={['block', 'block', 'none']}>
        <AddPost />
      </Box>
      <MobileMenu />
    </>
  );
};

export { Home };
