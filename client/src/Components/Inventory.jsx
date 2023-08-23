import { Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import CarBox from "./CarBox";

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("userToken") || null;
  const deleteCar = useSelector((store) => store.delete);

  useEffect(() => {
    async function getUsersInventory() {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/user/allcars/${id}`
        );
        console.log(data);
        setCars([...data]);
      } catch (error) {
        console.log(error);
      }
    }
    getUsersInventory();
  }, [deleteCar]);
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
