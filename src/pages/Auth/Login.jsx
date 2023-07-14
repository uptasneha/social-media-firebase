import { Container, Flex, Heading, Box, VStack } from '@chakra-ui/react';
import { Footer, LoginForm } from '../../components';

const Login = () => {
  return (
    <Container
      maxWidth="container.lg"
      padding={0}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
    >
      <Flex padding={[4, 8, 16]} paddingTop={[8, 8]}>
        <VStack
          width="full"
          alignItems="flex-start"
          justifyContent="center"
          display={['none', 'none', 'flex']}
        >
          <Heading fontSize="4xl">
            Share your
            <Box
              as="span"
              fontSize="5xl"
              fontFamily="'Parisienne', cursive;"
              color="#6d28d9"
              paddingX={4}
            >
              Insight
            </Box>{' '}
          </Heading>
          <Heading fontSize="4xl">Grow with the community!</Heading>
        </VStack>
        <VStack width="full">
          <LoginForm />
        </VStack>
      </Flex>
      <Footer />
    </Container>
  );
};

export { Login };
