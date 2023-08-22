import { Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CarBox from "./CarBox";

const Inventory = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function getUsersInventory() {
      const { data } = await axios.get(
        "http://localhost:4000/api/users/allcars"
      );
      setCars([...data]);
    }
    getUsersInventory();
  }, []);
  return (
    <Box p={4}>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing={4}
        maxW={"container.xl"}
        mx={"auto"}
      >
        {cars?.map((car) => {
          return <CarBox {...car} key={car._id} isOwner={true} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Inventory;
