import { VStack, Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { AddPost } from './index';

const getActiveStyle = ({ isActive }) => ({
  fontWeight: isActive ? '800' : '500',
});

const NavMenu = () => {
  const menuHoverColor = useColorModeValue('blackAlpha.200', 'gray.700');
  return (
    <VStack w="full" spacing={2} align="flex-start" position="sticky" top="74">
      <HStack
        as={NavLink}
        to="/"
        fontSize={20}
        py={2}
        px={4}
        _hover={{ backgroundColor: menuHoverColor }}
        borderRadius="full"
        style={getActiveStyle}
      >
        <Box as="span" className="material-icons">
          home
        </Box>
        <Text>Home</Text>
      </HStack>
      <HStack
        as={NavLink}
        to="/explore"
        fontSize={20}
        py={2}
        px={4}
        _hover={{ backgroundColor: menuHoverColor }}
        borderRadius="full"
        style={getActiveStyle}
      >
        <Box as="span" className="material-icons">
          explore
        </Box>
        <Text>Explore</Text>
      </HStack>
      <HStack
        as={NavLink}
        to="/bookmarks"
        fontSize={20}
        py={2}
        px={4}
        _hover={{ backgroundColor: menuHoverColor }}
        borderRadius="full"
        style={getActiveStyle}
      >
        <Box as="span" className="material-icons">
          bookmark
        </Box>
        <Text>Bookmarks</Text>
      </HStack>
      <Box width="full" paddingTop={5}>
        <AddPost />
      </Box>
    </VStack>
  );
};

export { NavMenu };
