import {
  HStack,
  Box,
  Heading,
  Avatar,
  useColorMode,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopBar = () => {
  const { currentUser } = useSelector(state => state.user);
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const topbarBgColor = useColorModeValue('rgb(247,247,247)', 'rgb(26,32,44)');
  return (
    <HStack
      justify="space-between"
      marginBottom={[0, 2, 2]}
      paddingY={2}
      position="sticky"
      top="0"
      backgroundColor={topbarBgColor}
      zIndex="1"
    >
      <Heading
        as="h1"
        fontSize={['4xl', '5xl']}
        fontFamily="'Parisienne', cursive;"
        color="#6d28d9"
        paddingLeft={['8px']}
      >
        Insight
      </Heading>
      <HStack>
        <IconButton
          size="md"
          fontSize="lg"
          variant="ghost"
          marginRight={8}
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
        />

        <Box
          as={NavLink}
          to={`/user/${currentUser.uid}`}
          paddingRight={8}
          cursor="pointer"
        >
          <Avatar src={currentUser.photoURL} name={currentUser.name} />
        </Box>
      </HStack>
    </HStack>
  );
};

export { TopBar };
