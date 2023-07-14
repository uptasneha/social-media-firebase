import {
  VStack,
  FormControl,
  FormLabel,
  Button,
  Heading,
  Input,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSignUp } from '../features/auth/authSlice';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
  });
  const { status, userData } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';
  const formBgColor = useColorModeValue('#fff', 'gray.700');

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleInputChange = e => {
    let newInput = { [e.target.name]: e.target.value };
    setSignUpData({ ...signUpData, ...newInput });
  };

  const handleSignUp = e => {
    e.preventDefault();
    dispatch(userSignUp(signUpData));
  };

  useEffect(() => {
    if (!!userData) {
      navigate(from, { replace: true });
    }
  }, [userData, navigate, from]);
  return (
    <VStack
      onSubmit={handleSignUp}
      as="form"
      width="full"
      spacing={5}
      padding={8}
      backgroundColor={formBgColor}
      borderRadius="xl"
      boxShadow="lg"
    >
      <Heading size="xl">Sign up</Heading>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter email"
          name="email"
          value={signUpData.name}
          onChange={e => handleInputChange(e)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Full name</FormLabel>
        <Input
          placeholder="Enter full name"
          name="fullName"
          value={signUpData.fullName}
          onChange={e => handleInputChange(e)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter username"
          name="username"
          value={signUpData.username}
          onChange={e => handleInputChange(e)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            paddingRight="2rem"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            name="password"
            value={signUpData.password}
            onChange={e => handleInputChange(e)}
          />
          <InputRightElement width="2rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleShowPassword}
              paddingX={4}
              height="full"
              variant="ghost"
            >
              <Box as="span" className="material-icons" fontSize="20px">
                {showPassword ? 'visibility_off' : 'visibility'}
              </Box>
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {status === 'loading' ? (
        <Button
          isLoading
          loadingText="Signing up"
          width="full"
          backgroundColor="#6d28d9"
          color="#fff"
          _hover={{ backgroundColor: '#6d28d9' }}
        >
          Sign up
        </Button>
      ) : (
        <Button
          type="submit"
          width="full"
          backgroundColor="#6d28d9"
          color="#fff"
          _hover={{ backgroundColor: '#6d28d9' }}
        >
          Sign up
        </Button>
      )}
      <Text>
        Have an account?{' '}
        <Link as={NavLink} to="/login">
          Login
        </Link>
      </Text>
    </VStack>
  );
};

export { SignUpForm };
