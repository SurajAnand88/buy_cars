import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Inventory from "./Components/Inventory";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import PostOrEditCar from "./Components/PostOrEditCar";
import SignUp from "./Components/SignUp";
import SingleCar from "./Components/SingleCar";

function App() {
  const token = localStorage.getItem("userToken") || null;
  const user = useSelector((store) => store.user);

  //creating a private route based on token
  const PrivateRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/car/:id" element={<SingleCar />} />
        <Route
          path="/car/edit/:id"
          element={
            <PrivateRoute>
              <PostOrEditCar />
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory/:id"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />
        <Route
          path="/addcar"
          element={
            <PrivateRoute>
              <PostOrEditCar />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PostOrEditCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
