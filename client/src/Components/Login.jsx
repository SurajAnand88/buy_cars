import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

const Login = () => {
  return (
    <Container maxW="lg">
      <Box mt={8} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading as="h2" mb={6} size="lg">
          Log In
        </Heading>
        <form>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="john@example.com" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="********" />
          </FormControl>
          <Button colorScheme="blue" type="submit" w="100%">
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
