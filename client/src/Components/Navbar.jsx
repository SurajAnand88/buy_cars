import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("userToken") || null;
  return (
    //creating Navbar component using Chakra UI
    <Box bg={"blue.500"} color={"white"}>
      <Flex
        maxW={"container.xl"}
        mx={"auto"}
        p={4}
        justify={"space-between"}
        align={"center"}
      >
        <Link to={"/"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            BuyCars
          </Text>
        </Link>
        {!token ? (
          <Flex gap={4} align={"center"}>
            <Link to={"/login"}>
              <Button>Login</Button>
            </Link>
            <Link to={"/signup"}>
              <Button>SignUp</Button>
            </Link>
          </Flex>
        ) : (
          <Flex gap={4} align={"center"}>
            <Link to={"/addcar"}>
              <Button>AddCar</Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
