import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      let data =await fetch ('http://localhost:5000/api/v1/user/login',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        
        },
        body: JSON.stringify({   
          email: inputs.email,
          password: inputs.password,
        }),
  
        });
        data=await data.json();
        console.log(data);
      if (data.success) {

        localStorage.setItem("token", data?.token);

        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
      else{
        toast.error("Invalid login credential");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
