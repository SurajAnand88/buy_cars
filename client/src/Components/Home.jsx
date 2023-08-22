import { Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CarBox from "./CarBox";

const Home = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    async function getCars() {
      const { data } = await axios.get("http://localhost:4000/api/allcars");
      setCars([...data]);
    }
    getCars();
  }, []);
  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={10}
        maxW={"container.xl"}
        mx={"auto"}
      >
        {cars?.map((car) => {
          return <CarBox {...car} key={car._id} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
