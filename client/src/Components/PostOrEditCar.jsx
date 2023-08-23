import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

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
  const toast = useToast();
  const navigate = useNavigate();

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [carDetails, setCardetails] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState({});

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
    setCardetails({
      ...carDetails,
      company: event.target.value,
    });
    setSelectedModel("");
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    setCardetails({
      ...carDetails,
      model: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("userToken") || null;
      if (id && token) {
        const { data } = await axios.post(
          `http://localhost:4000/api/user/editcar/${id}`,
          {
            ...carDetails,
            additionalInfo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast({
          title: `${data.company} ${data.model} Updated Successfully`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/inventory");
      } else {
        const { data } = await axios.post(
          `http://localhost:4000/api/user/addcar`,
          {
            ...carDetails,
            additionalInfo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast({
          title: `${data.newCar.company} ${data.newCar.model} Added Successfully`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/inventory");
      }
    } catch (error) {
      console.log(error);
    }
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
          {id ? "Edit Your Car" : "Add Your Car"}
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
                  defaultValue={id ? car.model : selectedModel}
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
                  defaultValue={id ? car?.year : null}
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
                  defaultValue={id ? car?.price : null}
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
                  defaultValue={id ? car?.mileage : null}
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
                <FormLabel>Top Speed</FormLabel>
                <Input
                  name="topSpeed"
                  defaultValue={id ? car?.topSpeed : null}
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
                  defaultValue={id ? car?.power : null}
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
                  defaultValue={id ? car?.image : null}
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
                <FormLabel>color</FormLabel>
                <Input
                  name="color"
                  defaultValue={id ? car?.color : null}
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
                <FormLabel>Fuel Type</FormLabel>
                <Select
                  name="fuelType"
                  defaultValue={id ? car?.fuelType : null}
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
                defaultValue={id ? car?.additionalInfo?.boughtYear : null}
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
                defaultValue={id ? car?.additionalInfo?.boughtPrice : null}
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
                defaultValue={id ? car?.additionalInfo?.scratches : null}
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
                defaultValue={id ? car?.additionalInfo?.numberOfOwners : null}
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
                defaultValue={id ? car?.additionalInfo?.sellPrice : null}
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
            {id ? "Update Car" : "Post Car"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PostOrEditCar;
