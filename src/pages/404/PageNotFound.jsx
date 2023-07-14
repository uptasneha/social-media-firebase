import { Container, Image, Button, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { pageNotFound } from '../../asset';

const PageNotFound = () => {
  return (
    <Container maxWidth="container.xl" padding={8}>
      <VStack justifyContent="center" gap={8}>
        <Image src={pageNotFound} />
        <Button
          as={NavLink}
          to="/"
          borderRadius="full"
          backgroundColor="#6d28d9"
          color="#fff"
          _hover={{ backgroundColor: '#6d28d9' }}
          size="lg"
        >
          Back to home
        </Button>
      </VStack>
    </Container>
  );
};

export { PageNotFound };
