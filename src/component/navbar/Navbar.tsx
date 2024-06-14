import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Container,
  AppBar,
  Toolbar,
  useTheme,
  Button,
  Box,
} from "@mui/material/";

import XsNavbar from "./XsNavbar";
import MdNavbar from "./MdNavbar";
import DropDownMenu from "./DropDownMenu";
import css from "./styles.module.css";

const pages = [{ title: "Home", path: "/" }];
const settings = [
  { title: "Profile", path: "/profile" },
  { title: "Logout", path: "/" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const theme = useTheme();
  theme.palette.background;
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <XsNavbar pages={pages} />
          <MdNavbar pages={pages} />
          {isLoggedIn ? (
            <DropDownMenu settings={settings} />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <NavLink to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  className={pathname === "/signin" ? css["selected"] : ""}
                  sx={{
                    textTransform: "none",
                    my: 2,
                    display: "block",
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  {"Signin"}
                </Button>
              </NavLink>
              <NavLink to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  className={pathname === "/signup" ? css["selected"] : ""}
                  sx={{
                    textTransform: "none",
                    my: 2,
                    display: "block",
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  {"Signup"}
                </Button>
              </NavLink>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
