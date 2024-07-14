import * as React from "react";
import { NavLink } from "react-router-dom";

import {
  MenuItem,
  Box,
  IconButton,
  Typography,
  Menu,
  useTheme,
  styled,
} from "@mui/material/";

import { Menu as MenuIcon } from "@mui/icons-material/";

export type XsNavbarProps = {
  pages: {
    title: string;
    path: string;
  }[];
};

const BoxContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const XsNavbar = ({ pages }: XsNavbarProps) => {
  const theme = useTheme();
  const totalPages = [
    ...pages,
    { title: "SignIn", path: "/signin" },
    { title: "SignUp", path: "/signup" },
  ];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <BoxContainer>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages &&
            totalPages.map(({ title, path }) => (
              <NavLink
                key={path}
                to={path}
                style={{
                  textDecoration: "none",
                }}
              >
                <MenuItem key={title} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                    textAlign="center"
                  >
                    {title}
                  </Typography>
                </MenuItem>
              </NavLink>
            ))}
        </Menu>
      </BoxContainer>
      <BoxContainer>
        <img
          style={{
            cursor: "pointer",
            border: "2px solid white",
            borderRadius: "50%",
          }}
          alt="SwipeAdvisor"
          src="../../../assets/SwipeAdvisor.jpg"
          width="100px"
          height="85px"
        />
      </BoxContainer>
    </>
  );
};
export default XsNavbar;
