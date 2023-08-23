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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Login = () => {
  const [obj, setObj] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        data: { token, user },
      } = await axios.post("http://localhost:4000/api/auth/login", obj);
      toast({
        title: "Success",
        description: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
      localStorage.setItem("userToken", token);
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    } catch ({
      response: {
        data: { message },
      },
    }) {
      console.log(message);
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }
  return (
    <Container maxW="lg">
      <Box mt={8} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading as="h2" mb={6} size="lg">
          Log In
        </Heading>
        <form onSubmit={handleSubmit}>
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
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
