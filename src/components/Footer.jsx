import { VStack, Text, Box, Link, HStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <VStack as="footer" paddingY={8}>
      <Text>Made by Pratik Devle</Text>
      <HStack spacing={4} color="#6d28d9" fontSize="24px">
        <Link href="https://github.com/Pratik1005" isExternal>
          <Box as="i" className="fab fa-github"></Box>
        </Link>
        <Link
          href="https://www.linkedin.com/in/pratik-devle-296184160"
          isExternal
        >
          <Box as="i" className="fab fa-linkedin-in"></Box>
        </Link>
        <Link href="https://twitter.com/DevlePratik" isExternal>
          <Box as="i" className="fab fa-twitter"></Box>
        </Link>
      </HStack>
      <Text fontSize="14px">© {new Date().getFullYear()} Insight</Text>
    </VStack>
  );
};

export { Footer };
