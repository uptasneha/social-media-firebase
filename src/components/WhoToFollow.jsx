import {
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Heading,
  Flex,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchBar } from './index';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { followUser } from '../features/user/userSlice';

const WhoToFollow = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { allUsers, currentUser } = useSelector(state => state.user);
  const { following } = currentUser;
  const suggestions = allUsers
    .filter(
      user => !following.some(followingUser => user.uid === followingUser.uid)
    )
    .filter(user => user.uid !== currentUser.uid);
  const boxBgColor = useColorModeValue('#ffffff', 'gray.700');
  const lightTextColor = useColorModeValue('gray.600', 'gray.400');

  const handleFollowUser = userData => {
    dispatch(
      followUser({
        suggest: true,
        currentLocation: location.pathname,
        currentUserData: { ...currentUser },
        uid: userData.uid,
        name: userData.name,
        username: userData.username,
        photoURL: userData.photoURL,
      })
    );
  };

  const FollowUser = ({ userData }) => {
    const { uid, photoURL, name, username } = userData;

    return (
      <HStack justify="space-between" width="full">
        <Box as={NavLink} to={`/user/${uid}`}>
          <HStack>
            <Avatar name={name} src={photoURL} />
            <Flex justify="center" align="flex-start" flexDirection="column">
              <Text fontWeight="500">{name}</Text>
              <Text color={lightTextColor} marginTop={0}>
                @{username}
              </Text>
            </Flex>
          </HStack>
        </Box>
        <Button
          borderRadius="full"
          backgroundColor="#6d28d9"
          color="#fff"
          size="sm"
          _hover={{ backgroundColor: '#6d28d9' }}
          onClick={() => handleFollowUser(userData)}
        >
          Follow
        </Button>
      </HStack>
    );
  };
  return (
    <VStack position="sticky" top="74">
      <SearchBar />
      <VStack
        backgroundColor={boxBgColor}
        borderRadius="2xl"
        align="flex-start"
        width="full"
        padding={4}
        spacing={5}
        boxShadow="xl"
      >
        <Heading as="h3" fontSize="20px">
          Who to follow
        </Heading>
        {suggestions.length > 0 ? (
          suggestions.map(user => <FollowUser userData={user} key={user.uid} />)
        ) : (
          <Text>No suggestions found</Text>
        )}
      </VStack>
    </VStack>
  );
};

export { WhoToFollow };
