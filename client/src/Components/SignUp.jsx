import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
const SignUp = () => {
  return (
    <Container maxW="lg">
      <Box mt={8} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading as="h2" mb={6} size="lg">
          Sign Up
        </Heading>
        <form>
          <FormControl mb={4}>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" placeholder="John Doe" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="john@example.com" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="********" />
          </FormControl>
          <Button colorScheme="blue" type="submit" w="100%">
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
