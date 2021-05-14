import React from "react";
import Nav from "./Nav";
import { Box } from "@chakra-ui/react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box className="layoutContainer">
      <Box>
        {/* <Nav /> */}
        <Box>{children}</Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
