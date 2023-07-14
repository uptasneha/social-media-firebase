import {
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Spinner,
  Text,
  Box,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookmarks } from '../../features/post/postSlice';
import {
  NavMenu,
  PostCard,
  TopBar,
  WhoToFollow,
  MobileMenu,
  AddPost,
} from '../../components';

const Bookmark = () => {
  const { bookmarks, bookmarkStatus } = useSelector(state => state.post);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks(currentUser.uid));
  }, [currentUser.uid, dispatch]);

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
          <GridItem>
            <VStack paddingX={['8px', '8px']}>
              <Heading fontSize="25px" paddingBottom={2}>
                Bookmarks
              </Heading>
              {bookmarkStatus === 'fulfilled' ? (
                <>
                  {bookmarks.length > 0 ? (
                    bookmarks.map(post => (
                      <PostCard key={post.id} postData={post} />
                    ))
                  ) : (
                    <Text>No bookmarks to show</Text>
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

export { Bookmark };
