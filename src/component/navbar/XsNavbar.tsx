import * as React from "react";
import { NavLink } from "react-router-dom";

import {
  MenuItem,
  Box,
  IconButton,
  Typography,
  Menu,
  useTheme,
} from "@mui/material/";

import { Menu as MenuIcon } from "@mui/icons-material/";

export type XsNavbarProps = {
  pages: {
    title: string;
    path: string;
  }[];
};

const XsNavbar = ({ pages }: XsNavbarProps) => {
  const theme = useTheme();
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
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
        }}
      >
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
            pages.map(({ title, path }) => (
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
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
        }}
      >
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
      </Box>
    </>
  );
};
export default XsNavbar;
