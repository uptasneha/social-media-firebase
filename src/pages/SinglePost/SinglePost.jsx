import { Container, Grid, GridItem, VStack, Spinner } from '@chakra-ui/react';
import {
  Comment,
  NavMenu,
  TopBar,
  WhoToFollow,
  PostCard,
  MobileMenu,
} from '../../components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost } from '../../features/post/postSlice';

const SinglePost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { singlePost, singlePostStatus } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getSinglePost({ uid: params.uid, postId: params.postId }));
  }, [dispatch, params.uid, params.postId]);
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
              {singlePostStatus === 'fulfilled' ? (
                <>
                  <PostCard postData={singlePost} />
                  <Comment postData={singlePost} />
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
      <MobileMenu />
    </>
  );
};

export { SinglePost };
