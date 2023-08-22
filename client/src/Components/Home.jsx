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
      console.log(cars);
    }
    getCars();
  }, []);
  return (
    <Box p={4}>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing={4}
        px={{ base: 2, sm: 10, md: 2 }}
        maxW={"container.xl"}
        mx={"auto"}
      >
        {cars?.map((car) => {
          return <CarBox {...car} key={car._id} isOwner={false} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
