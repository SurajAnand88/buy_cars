import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CarBox from "./CarBox";

const OwnerProfileContact = ({ ownerProfile }) => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    //getting all users cars by id
    async function getAllCars() {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/allcars/${ownerProfile?._id}`
      );
      setCars([...data]);
    }
    getAllCars();
  });
  return (
    <Box p={4}>
      <Text fontSize="1.4rem" fontWeight="bold" mb={2} textAlign={"center"}>
        Owner Details
      </Text>
      <Flex direction="column" align="center">
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Name : {ownerProfile?.name}
        </Text>
        <Text fontSize="md" color="gray.500" mb={2} fontSize="lg">
          Email : {ownerProfile?.email}
        </Text>
        {/* Render other owner details here */}
        <Text mt={4} fontSize="1.4rem" fontWeight="bold" mb={2}>
          Other Ads Post By This User
        </Text>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacing={4}
          maxW={"container.xl"}
        >
          {cars?.map((car) => {
            return <CarBox {...car} key={car._id} isOwner={false} />;
          })}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default OwnerProfileContact;
