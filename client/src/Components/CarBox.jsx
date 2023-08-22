import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
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
  isOwner,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
    >
      <Image src={image} alt={model} objectFit="cover" h="200px" />
      <Box p="4">
        <Heading as="h2" size="md" mb="2" isTruncated>
          {company} {model}
        </Heading>
        <Text color="gray.500" mb="2">
          {year} | {mileage} miles
        </Text>
        <Text fontWeight="bold" mb="2">
          ${price}
        </Text>
        {isOwner ? (
          <Link to={`/car/edit/${_id}`}>
            <Button colorScheme="blue" w={"100%"}>
              Edit Details
            </Button>
          </Link>
        ) : (
          <Link to={`/car/${_id}`}>
            <Button colorScheme="blue" w={"100%"}>
              View Details
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default CarBox;
