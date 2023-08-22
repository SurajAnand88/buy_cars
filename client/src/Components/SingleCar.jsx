import React from "react";
import { useParams } from "react-router";

const SingleCar = () => {
  const { id } = useParams();
  return <div>SingleCar {id}</div>;
};

export default SingleCar;
