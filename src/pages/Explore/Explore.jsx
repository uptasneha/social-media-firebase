import {
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
  Spinner,
  Box,
} from '@chakra-ui/react';
import {
  NavMenu,
  TopBar,
  WhoToFollow,
  PostCard,
  MobileMenu,
  SearchBar,
  AddPost,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getExplorePosts } from '../../features/post/postSlice';

const Explore = () => {
  const dispatch = useDispatch();
  const { explorePosts, exploreStatus, error } = useSelector(
    state => state.post
  );
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(
      getExplorePosts({
        uid: currentUser.uid,
        following: currentUser.following,
      })
    );
  }, [currentUser.following, currentUser.uid, dispatch]);
  return (
    <>
      <Container maxWidth="container.xl" paddingX={[0, 0, 4]}>
        <TopBar />
        <Grid
          templateColumns={['1fr', '1fr', '1fr 3fr', '1fr 3fr 2fr']}
          gap={8}
        >
          <GridItem display={['none', 'none', 'block']}>
            <NavMenu />
          </GridItem>
          <GridItem paddingX={['8px', '8px']}>
            <VStack>
              <Heading fontSize="25px" paddingBottom={2}>
                Explore
              </Heading>
              <Box display={['block', 'block', 'block', 'none']} width="full">
                <SearchBar />
              </Box>
              {error && <Text>{error}</Text>}
              {exploreStatus === 'fulfilled' ? (
                <>
                  {explorePosts.length > 0 ? (
                    explorePosts.map(post => (
                      <PostCard key={post.id} postData={post} />
                    ))
                  ) : (
                    <Text>No post to show</Text>
                  )}
                </>
              ) : (
                <Spinner size="xl" />
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

export { Explore };
