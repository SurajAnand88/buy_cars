import { Box, Button, Container, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const SingleCar = () => {
  const { id } = useParams();
  const [carDetails, setCardetails] = useState({});

  useEffect(() => {
    async function getCarById() {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getcar/${id}`
      );
      setCardetails({ ...data });
    }
    getCarById();
  }, []);
  return (
    <Container maxW="lg">
      <Box p={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "center", md: "flex-start" }}
        >
          <Image
            src={carDetails.image}
            alt={carDetails.model}
            objectFit="cover"
            maxW="100%"
            h="auto"
          />
          <Box ml={{ md: 8 }} mt={{ base: 4, md: 0 }}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              {carDetails.company} {carDetails.model}
            </Text>
            <Text color="gray.500" mb={2}>
              {carDetails.year} | {carDetails.mileage} miles
            </Text>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              ${carDetails.price}
            </Text>
            <Text mb={2}>
              Sell Price: ${carDetails.additionalInfo?.sellPrice}
            </Text>
            <Text mb={4}>
              {carDetails.additionalInfo?.numberOfOwners} Owner(s)
            </Text>
            <Text>Top Speed: {carDetails.topSpeed} mph</Text>
            <Text>Fuel Type: {carDetails.fuelType}</Text>
            <Text>Power: {carDetails.power} hp</Text>
            <Text>Color: {carDetails.color}</Text>
            <Button mt={4} colorScheme="red" _hover={{ bg: "red.600" }}>
              Contact Owner
            </Button>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default SingleCar;
