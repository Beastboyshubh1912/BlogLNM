import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <img src="data:image/png;base64,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"   style={
            {
              height:"60px",
              width:"150px"
            }
          } alt="lnmiit"></img>
          <Typography variant="h4">BlogLNM </Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
