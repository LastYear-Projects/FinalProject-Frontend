import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Button, Box, useTheme } from "@mui/material/";

import css from "./styles.module.css";

export type MdNavbarProps = {
  pages: {
    title: string;
    path: string;
  }[];
};

const MdNavbar = ({ pages }: MdNavbarProps) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <img
          style={{
            cursor: "pointer",
            borderRadius: "50%",
            border: "2px solid white",
          }}
          alt="SwipeAdvisor"
          src="../../../assets/SwipeAdvisor.jpg"
          width="100px"
        />
      </Box>
      <Box
        sx={{
          marginLeft: "0.25rem",
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
        }}
      >
        {pages &&
          pages.map(({ title, path }) => (
            <NavLink key={path} to={path} style={{ textDecoration: "none" }}>
              <Button
                key={path}
                onClick={handleCloseNavMenu}
                className={pathname === path ? css["selected"] : ""}
                sx={{
                  my: 2,
                  display: "block",
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                {title}
              </Button>
            </NavLink>
          ))}
      </Box>
    </>
  );
};
export default MdNavbar;
