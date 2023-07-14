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
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../features/auth/authSlice';

const LoginForm = () => {
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { status, userData } = useSelector(state => state.auth);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const formBgColor = useColorModeValue('#fff', 'gray.700');

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleInputChange = e => {
    let newInput = { [e.target.name]: e.target.value };
    setLoginData({ ...loginData, ...newInput });
  };

  const handleLogin = e => {
    e.preventDefault();
    dispatch(userLogin(loginData));
  };

  const handleTestData = () => {
    setLoginData({ email: 'test@gmail.com', password: 'test@123' });
  };

  useEffect(() => {
    if (!!userData) {
      navigate(from, { replace: true });
    }
  }, [userData, navigate, from]);
  return (
    <VStack
      onSubmit={handleLogin}
      as="form"
      width="full"
      spacing={5}
      padding={8}
      backgroundColor={formBgColor}
      borderRadius="xl"
      boxShadow="lg"
    >
      <Heading size="xl">Login</Heading>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter email"
          name="email"
          value={loginData.email}
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
            value={loginData.password}
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
          loadingText="Logging"
          width="full"
          backgroundColor="#6d28d9"
          color="#fff"
          _hover={{ backgroundColor: '#6d28d9' }}
        >
          Login
        </Button>
      ) : (
        <Button
          type="submit"
          width="full"
          backgroundColor="#6d28d9"
          color="#fff"
          _hover={{ backgroundColor: '#6d28d9' }}
        >
          Login
        </Button>
      )}
      <Button width="full" onClick={handleTestData}>
        Use test credentials
      </Button>
      <Text>
        Don't have an account?{' '}
        <Link as={NavLink} to="/signup">
          Sign up
        </Link>
      </Text>
    </VStack>
  );
};

export { LoginForm };
