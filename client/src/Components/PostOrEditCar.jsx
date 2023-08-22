import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostOrEditCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  useEffect(() => {
    async function getCarById() {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getcar/${id}`
      );
      setCar({ ...data });
    }
    if (id) {
      getCarById();
    }
  }, []);
  return (
    <div>
      <h1>{car.company}</h1>
      <h1>{car.model}</h1>
    </div>
  );
};

export default PostOrEditCar;
