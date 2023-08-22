import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const carData = {
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Toyota: ["Camry", "Corolla", "Rav4", "Highlander"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot"],
  Ford: ["Mustang", "Focus", "Escape", "Explorer"],
  Chevrolet: ["Camaro", "Malibu", "Equinox", "Tahoe"],
};

const PostOrEditCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [carDetails, setCardetails] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState({});

  console.log(id, car, selectedCompany);
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
    setSelectedModel("");
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  useEffect(() => {
    async function getCarById() {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getcar/${id}`
      );
      setCar({ ...data });
      setSelectedCompany(data.company);
    }
    if (id) {
      getCarById();
    }
  }, []);

  return (
    <Container maxW="lg">
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4}>
          Post Your Car
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Company</FormLabel>
            <Select
              onChange={handleCompanyChange}
              value={selectedCompany}
              required
            >
              <option value="">Select Company</option>
              {Object.keys(carData).map((company, i) => {
                return (
                  <option value={company} key={i}>
                    {company}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          {selectedCompany && (
            <>
              <FormControl mb={4}>
                <FormLabel>Model</FormLabel>
                <Select
                  value={id ? car.model : selectedModel}
                  onChange={handleModelChange}
                  required
                >
                  <option value="">Select Model</option>
                  {carData[selectedCompany].map((model, i) => {
                    return (
                      <option value={model} key={i}>
                        {model}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              {/* Additional fields based on selected model */}
              <FormControl mb={4}>
                <FormLabel>Year</FormLabel>
                <Input
                  name="year"
                  value={id ? car?.year : ""}
                  type="number"
                  onChange={(e) =>
                    setCardetails({
                      ...carDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  value={id ? car?.price : ""}
                  type="number"
                  onChange={(e) =>
                    setCardetails({
                      ...carDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Mileage</FormLabel>
                <Input
                  name="mileage"
                  value={id ? car?.mileage : ""}
                  type="number"
                  onChange={(e) =>
                    setCardetails({
                      ...carDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Fuel Type</FormLabel>
                <Input
                  name="fuelType"
                  value={id ? car?.fuelType : ""}
                  type="text"
                  onChange={(e) =>
                    setCardetails({
                      ...carDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Top Speed</FormLabel>
                <Input
                  name="topSpeed"
                  value={id ? car?.topSpeed : ""}
                  type="text"
                  onChange={(e) =>
                    setCardetails({
                      ...carDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Power</FormLabel>
                <Input
                  name="power"
                  value={id ? car?.power : ""}
                  type="text"
                  onChange={(e) =>
                    setCardetails({
                      ...carDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Image Link</FormLabel>
                <Input
                  name="image"
                  value={id ? car?.image : ""}
                  type="text"
                  onChange={(e) =>
                    setCardetails({
                      ...carDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Color</FormLabel>
                <Select
                  name="color"
                  value={id ? car?.color : ""}
                  onChange={(e) =>
                    setCardetails({
                      ...carDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </Select>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Fuel Type</FormLabel>
                <Select
                  name="fuelType"
                  value={id ? car?.fuelType : ""}
                  onChange={(e) =>
                    setCardetails({
                      ...carDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </Select>
              </FormControl>
            </>
          )}
          {/* //Additional additionalInfo */}
          <Box mt={4}>
            <Heading as="h2" size="lg" mb={4}>
              Other Car Details
            </Heading>
            <FormControl mb={4}>
              <FormLabel>Buying Year</FormLabel>
              <Input
                name="boughtYear"
                value={id ? car?.additionalInfo?.boughtYear : ""}
                type="text"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Buying Price</FormLabel>
              <Input
                name="boughtPrice"
                value={id ? car?.additionalInfo?.boughtPrice : ""}
                type="text"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Scratches</FormLabel>
              <Input
                name="scratches"
                value={id ? car?.additionalInfo?.scratches : ""}
                type="text"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Number of Owners</FormLabel>
              <Input
                name="numberOfOwners"
                value={id ? car?.additionalInfo?.numberOfOwners : ""}
                type="text"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Sell Price</FormLabel>
              <Input
                name="sellPrice"
                value={id ? car?.additionalInfo?.sellPrice : ""}
                type="text"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
            </FormControl>
          </Box>
          <Button colorScheme="blue" type="submit" mt={4}>
            Post Car
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PostOrEditCar;
