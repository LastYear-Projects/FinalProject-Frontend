import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
import LanguageSwitcher from "./LanguagteSwitcher";

const pages = [{ title: "Home", path: "/" }];
const settings = [
  { title: "Profile", path: "/profile" },
  { title: "Logout", path: "/" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [isLoggedIn] = useState(false);
  const { t } = useTranslation();

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
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <NavLink to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  className={pathname === "/signin" ? css["selected"] : ""}
                  sx={{
                    my: 2,
                    display: "block",
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  {t("SignIn")}
                </Button>
              </NavLink>
              <NavLink to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  className={pathname === "/signup" ? css["selected"] : ""}
                  sx={{
                    my: 2,
                    display: "block",
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  {t("SignUp")}
                </Button>
              </NavLink>
            </Box>
          )}
          <LanguageSwitcher />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
