import {
  Input,
  Box,
  Avatar,
  Flex,
  HStack,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../features/user/userSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector(state => state.user);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const boxBgColor = useColorModeValue('#ffffff', 'gray.700');
  const lightTextColor = useColorModeValue('gray.600', 'gray.400');

  const debounce = func => {
    let timer;
    return function (...args) {
      let context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 300);
    };
  };

  const handleSearch = e => {
    setSearchValue(() => e.target.value);
    const value = e.target.value;
    if (value.trim().length) {
      const result = allUsers.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResult(() => result);
    }
  };

  const optimizedSearch = debounce(handleSearch);

  const SingleUser = ({ userData }) => {
    const { uid, photoURL, name, username } = userData;
    return (
      <Box as={NavLink} to={`/user/${uid}`}>
        <HStack>
          <Avatar name={name} src={photoURL} />
          <Flex justify="center" align="flex-start" flexDirection="column">
            <Text fontWeight="500">{name}</Text>
            <Text color={lightTextColor} marginTop={0}>
              {username}
            </Text>
          </Flex>
        </HStack>
      </Box>
    );
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <Input
        placeholder="Search Insight"
        borderRadius="full"
        border="2px"
        position="realtive"
        onChange={optimizedSearch}
      />
      {searchValue.trim().length > 0 && (
        <VStack
          backgroundColor={boxBgColor}
          borderRadius="2xl"
          align="flex-start"
          width="full"
          padding={4}
          spacing={5}
          boxShadow="xl"
          position="absolute"
          top={['160px', '160px', '160px', '40px']}
          left="0"
          zIndex="1"
        >
          {searchResult.length > 0 ? (
            searchResult.map(user => (
              <SingleUser key={user.uid} userData={user} />
            ))
          ) : (
            <Text>No user found</Text>
          )}
        </VStack>
      )}
    </>
  );
};

export { SearchBar };
