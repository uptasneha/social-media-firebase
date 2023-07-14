import {
  Container,
  Grid,
  GridItem,
  VStack,
  Text,
  Spinner,
  HStack,
  Box,
} from '@chakra-ui/react';
import {
  NavMenu,
  TopBar,
  WhoToFollow,
  PostCard,
  ProfileCard,
  MobileMenu,
  AddPost,
} from '../../components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../features/user/userSlice';
import { getUserPosts } from '../../features/post/postSlice';

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { userProfile, status, error } = useSelector(state => state.user);
  const { userPosts, userPostsStatus, postStatus } = useSelector(
    state => state.post
  );

  useEffect(() => {
    dispatch(getUserProfile(params.uid));
    dispatch(getUserPosts(params.uid));
  }, [params.uid, dispatch]);
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
            {error && <Text>{error}</Text>}
            {status === 'fulfilled' ? (
              <>
                <ProfileCard userData={userProfile.userData} />
                <VStack>
                  {userPostsStatus === 'loading' && <Spinner size="xl" />}
                  {postStatus === 'loading' && <Spinner size="xl" />}
                  {userPosts.length > 0 ? (
                    userPosts.map(post => (
                      <PostCard key={post.id} postData={post} />
                    ))
                  ) : (
                    <Text>No posts to show</Text>
                  )}
                </VStack>
              </>
            ) : (
              <HStack justifyContent="center">
                <Spinner size="xl" />
              </HStack>
            )}
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

export { Profile };
