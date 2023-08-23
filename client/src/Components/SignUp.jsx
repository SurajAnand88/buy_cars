import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
const SignUp = () => {
  const [obj, setObj] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        data: { message, user },
      } = await axios.post("http://localhost:4000/api/auth/register", obj);
      console.log(user);
      toast({
        title: "Success",
        description: message + ` with email ${user.useremail}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      if (message == "User already exists") {
        navigate("/login");
      }
    }
  };
  console.log(obj);
  return (
    <Container maxW="lg">
      <Box mt={8} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading as="h2" mb={6} size="lg">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder="John Doe"
              name="name"
              required
              onChange={(e) =>
                setObj({ ...obj, [e.target.name]: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="john@example.com"
              name="email"
              required
              onChange={(e) =>
                setObj({ ...obj, [e.target.name]: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="********"
              name="password"
              required
              onChange={(e) =>
                setObj({ ...obj, [e.target.name]: e.target.value })
              }
            />
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
