import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Button, Box, styled } from '@mui/material/';

import css from './styles.module.css';
import { useTranslation } from 'react-i18next';

export type MdNavbarProps = {
  pages: {
    title: string;
    path: string;
  }[];
};

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const BoxContent = styled(Box)(({ theme }) => ({
  marginLeft: '0.25rem',
  flexGrow: 1,
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  my: 2,
  display: 'block',
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
            cursor: 'pointer',
            borderRadius: '50%',
            border: '3px solid white',
            boxShadow: '1rem 0.4rem 0.5rem rgba(0, 0, 0, 0.1)',
            width: '100px',
            height: '100px',
            margin: '0 1rem',
          }}
          alt='SwipeAdvisor'
          src='../../../assets/SwipeAdvisor.jpg'
        />
      </BoxContainer>
      <BoxContent>
        {pages &&
          pages.map(({ title, path }) => (
            <NavLink key={path} to={path} style={{ textDecoration: 'none' }}>
              <StyledButton
                key={path}
                onClick={handleCloseNavMenu}
                id={pathname === path ? css['selected'] : ''}
                // className={pathname === path ? css['selected'] : ''}
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
