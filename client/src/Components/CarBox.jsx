import { Box, Button, Heading, Image, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CarBox = ({
  _id,
  company,
  model,
  price,
  year,
  mileage,
  topSpeed,
  fuelType,
  power,
  color,
  image,
  additionalInfo,
  isOwner,
  owner,
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [adOwner, setAdOwner] = useState({});
  async function handleDelete() {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        `http://localhost:4000/api/user/deletecar/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Car Deleted Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      dispatch({
        type: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getUserById() {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getuserbyid/${owner}`
      );
      setAdOwner({ ...data });
    }
    getUserById();
  });

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
    >
      <Image src={image} alt={model} objectFit="cover" h="200px" w={"100%"} />
      <Box p="4">
        <Heading as="h2" size="md" mb="2" isTruncated>
          {company} {model}
        </Heading>
        <Text color="gray.500" mb="2">
          {year} | {mileage} miles
        </Text>
        <Text fontWeight="bold" mb="2">
          Price : ${additionalInfo?.sellPrice}
        </Text>
        {isOwner ? (
          <>
            <Link to={`/car/edit/${_id}`}>
              <Button colorScheme="blue" w={"100%"}>
                Edit Details
              </Button>
            </Link>
            <Button colorScheme="red" w={"100%"} mt={4} onClick={handleDelete}>
              Delete Car
            </Button>
          </>
        ) : (
          <Link to={`/car/${_id}`}>
            <Button colorScheme="blue" w={"100%"}>
              View Details
            </Button>
          </Link>
        )}
        <Box
          textAlign={"center"}
          fontWeight={"semibold"}
          fontSize={"lg"}
          mt={2}
        >
          Posted by: {adOwner.name}
        </Box>
      </Box>
    </Box>
  );
};

export default CarBox;
