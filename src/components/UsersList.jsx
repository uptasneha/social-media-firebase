import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Avatar,
  Text,
  Box,
  Flex,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useFetchUser } from '../hooks/useFetchUser';

const UsersList = ({ title, users }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightTextColor = useColorModeValue('gray.600', 'gray.400');

  const SingleUser = ({ userData }) => {
    const { uid, username } = userData;

    const updatedUser = useFetchUser(uid, 'users list modal');
    return (
      <HStack paddingY={4}>
        <Box as={NavLink} to={`/user/${uid}`}>
          <Avatar name={updatedUser.name} src={updatedUser.photoURL} />
        </Box>
        <Flex justify="center" align="flex-start" flexDirection="column">
          <Text as="span" fontWeight="500">
            {updatedUser.name}
          </Text>
          <Text as="span" color={lightTextColor} marginTop={0}>
            {`@${username}`}
          </Text>
        </Flex>
      </HStack>
    );
  };
  return (
    <>
      <Box as="span" fontWeight="500">{`${users.length}`}</Box>
      <Text
        onClick={onOpen}
        cursor="pointer"
        _hover={{ textDecoration: 'underline' }}
      >{`${title}`}</Text>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {users.length > 0 ? (
              users.map(user => <SingleUser key={user.uid} userData={user} />)
            ) : (
              <Text paddingY={4}>{`No ${title} found`}</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { UsersList };
