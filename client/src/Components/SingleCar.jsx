import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const SingleCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});

  useEffect(() => {
    async function getCarById() {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getcar/${id}`
      );
      setCar({ ...data });
    }
    getCarById();
  }, []);
  return (
    <Box p={2}>
      <Flex maxW={"container.xl"} mx={"auto"}></Flex>
      <Text>{car.company}</Text>
      <Text>{car.model}</Text>
      <Text>{car.price}</Text>
      <Text>{car.year}</Text>
      <Text>{car.mileage}</Text>
      <Text>{car.topSpeed}</Text>
      <Text>{car.fuelType}</Text>
      <Text>{car.power}</Text>
      <Text>{car.color}</Text>
      <Text>{car.image}</Text>
    </Box>
  );
};

export default SingleCar;
