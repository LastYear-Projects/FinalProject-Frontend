import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Button, Box, styled } from "@mui/material/";

import css from "./styles.module.css";
import { useTranslation } from "react-i18next";

export type MdNavbarProps = {
  pages: {
    title: string;
    path: string;
  }[];
};

const BoxContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const BoxContent = styled(Box)(({ theme }) => ({
  marginLeft: "0.25rem",
  flexGrow: 1,
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  my: 2,
  display: "block",
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold,
}));

const MdNavbar = ({ pages }: MdNavbarProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <BoxContainer>
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
      </BoxContainer>
      <BoxContent>
        {pages &&
          pages.map(({ title, path }) => (
            <NavLink key={path} to={path} style={{ textDecoration: "none" }}>
              <StyledButton
                key={path}
                onClick={handleCloseNavMenu}
                className={pathname === path ? css["selected"] : ""}
              >
                {t(title)}
              </StyledButton>
            </NavLink>
          ))}
      </BoxContent>
    </>
  );
};
export default MdNavbar;
