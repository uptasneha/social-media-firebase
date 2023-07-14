import { HStack, Box, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const MobileMenu = () => {
  const menuBgColor = useColorModeValue('#f7f7f7', '#1a202c');
  return (
    <HStack
      justifyContent="space-between"
      width="full"
      backgroundColor={menuBgColor}
      paddingY={4}
      paddingX={5}
      position="fixed"
      left="0"
      bottom="0"
      display={['flex', 'flex', 'none']}
    >
      <Box as={NavLink} to="/" className="material-icons">
        home
      </Box>
      <Box as={NavLink} to="/explore" className="material-icons">
        explore
      </Box>
      <Box as={NavLink} to="/bookmarks" className="material-icons">
        bookmark
      </Box>
    </HStack>
  );
};

export { MobileMenu };
