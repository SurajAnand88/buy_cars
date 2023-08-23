import { Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("userToken") || null;
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getLoddedInUser() {
      try {
        if (token) {
          const {
            data: { user },
          } = await axios.get(`http://localhost:4000/api/auth/loggedInUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({
            type: "LOGIN",
            payload: user,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getLoddedInUser();
  }, []);

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
        {user === null ? (
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
            <Link to={`/inventory/${user?._id}`}>
              <Button>Inventory</Button>
            </Link>
            <Link to={"/addcar"}>
              <Button>AddCar</Button>
            </Link>
            <Button
              onClick={() => {
                localStorage.removeItem("userToken");
                dispatch({
                  type: "LOGOUT",
                });
              }}
            >
              Logout
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
