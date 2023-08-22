import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
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
}) => {
  console.log(additionalInfo);
  return (
    <Flex p={2} border={"1px solid black"}>
      <Text>{company}</Text>
      <Text>{model}</Text>
      <Text>{price}</Text>
      <Text>{year}</Text>
      <Text>{mileage}</Text>
      <Text>{topSpeed}</Text>
      <Text>{fuelType}</Text>
      {/* <Text>{owner}</Text> */}
      <Text>{power}</Text>
      <Text>{color}</Text>
      <Text>{image}</Text>
      {/* <Text>{additionalInfo}</Text> */}
      <Link to={`/car/${_id}`}>
        <Button colorScheme="blue" size={"xs"}>
          View Details
        </Button>
      </Link>
    </Flex>
  );
};

export default CarBox;
