import {
  VStack,
  Box,
  HStack,
  Text,
  Link,
  Image,
  Flex,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { defaultHeader } from '../asset';
import { ProfileCta, UsersList } from './index';

const ProfileCard = ({ userData }) => {
  const {
    uid,
    name,
    username,
    photoURL,
    headerImage,
    followers,
    following,
    bio,
    website,
  } = userData;
  const profileBgColor = useColorModeValue('#ffffff', 'gray.700');
  const lightTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack
      backgroundColor={profileBgColor}
      borderRadius="2xl"
      boxShadow="xl"
      overflow="hidden"
      marginBottom={4}
    >
      <Box width="full">
        <Image
          src={headerImage}
          fallbackSrc={defaultHeader}
          width="full"
          height={['130px', '250px']}
          objectFit="cover"
        />
      </Box>
      <VStack width="full" alignItems="flex-start" padding={4}>
        <HStack justifyContent="space-between" width="full">
          <Box width="120px" height="120px" marginTop="-80px">
            <Avatar src={photoURL} name={name} size={['xl', '2xl']} />
          </Box>
          <Box>
            <ProfileCta
              followUserData={{ uid, name, username, photoURL }}
              userData={userData}
            />
          </Box>
        </HStack>
        <Flex justify="center" align="flex-start" flexDirection="column">
          <Text fontWeight="500" fontSize="20px">
            {name}
          </Text>
          <Text color={lightTextColor} marginTop={0}>
            {`@${username}`}
          </Text>
        </Flex>
        {bio && <Text>{bio}</Text>}
        {website && (
          <HStack>
            <Box as="span" className="material-icons">
              link
            </Box>
            <Link href={website} isExternal>
              {website}
            </Link>
          </HStack>
        )}
        <HStack>
          <HStack paddingRight={4}>
            <UsersList title="Following" users={following} />
          </HStack>
          <HStack>
            <UsersList title="Followers" users={followers} />
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export { ProfileCard };
