import { Box, Container, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import OwnerProfileContact from "./ContactOwner";
const OwnerProfileContact = React.lazy(() => import("./ContactOwner"));

const SingleCar = () => {
  const { id } = useParams();
  const [carDetails, setCardetails] = useState({});
  const [owner, setOwner] = useState({});
  const [ownerProfileLoaded, setOwnerProfileLoaded] = useState(false);

  useEffect(() => {
    async function getCarById() {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getcar/${id}`
      );
      setCardetails({ ...data });
      const { data: userData } = await axios.get(
        `http://localhost:4000/api/user/getuserbyid/${data.owner}`
      );
      setOwner({ ...userData });
      setOwnerProfileLoaded(true);
    }
    getCarById();
  }, [id]);
  return (
    <Container
      maxW={"container.xl"}
      mx={"auto"}
      boxShadow={"lg"}
      w={"94%"}
      mt={4}
      borderRadius={"lg"}
    >
      <Box p={4} w={"100%"}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "start" }}
          justify={{ base: "start", md: "center" }}
          w={"100%"}
          gap={4}
        >
          <Box w={{ base: "100%", md: "70%" }}>
            <Image
              src={carDetails.image}
              alt={carDetails.model}
              objectFit="cover"
              w={"100%"}
              h="auto"
            />
          </Box>
          <Flex
            ml={{ md: 8 }}
            mt={{ base: 4, md: 0 }}
            fontWeight={"semibold"}
            px={8}
            w={{ base: "100%", md: "50%", lg: "40%" }}
            direction={"column"}
            align={"center"}
          >
            <Text fontSize="1.5rem" fontWeight="bold" mb={2}>
              {carDetails.company} {carDetails.model}
            </Text>
            <Text color="gray.500" mb={2}>
              {carDetails.year} | {carDetails.mileage} miles
            </Text>
            <Text fontWeight="bold" fontSize="1.2rem" mb={4}>
              Real Price : ${carDetails.price}
            </Text>
            <Text mb={2} color={"green"} fontSize="1.2rem">
              Sell Price: ${carDetails.additionalInfo?.sellPrice}
            </Text>
            <Text mb={4}>
              {carDetails.additionalInfo?.numberOfOwners} Owner(s)
            </Text>
            <Text>Top Speed: {carDetails.topSpeed} mph</Text>
            <Text>Fuel Type: {carDetails.fuelType}</Text>
            <Text>Power: {carDetails.power} hp</Text>
            <Text>Color: {carDetails.color}</Text>
            <Text>Scratches: {carDetails.additionalInfo?.scratches}</Text>
          </Flex>
        </Flex>
      </Box>
      {ownerProfileLoaded ? (
        <OwnerProfileContact ownerProfile={owner} />
      ) : (
        <Text textAlign="center" mt={2}>
          <Spinner size="md" color="blue.500" mr={2} />
          Loading Users Inventory.....
        </Text>
      )}
    </Container>
  );
};

export default SingleCar;
