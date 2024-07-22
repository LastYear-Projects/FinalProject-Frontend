import * as React from 'react';
import { NavLink } from 'react-router-dom';

import {
  MenuItem,
  Box,
  IconButton,
  Typography,
  Menu,
  useTheme,
  styled,
} from '@mui/material/';

import { Menu as MenuIcon } from '@mui/icons-material/';
import { useTranslation } from 'react-i18next';
import { useIsAuth } from '../../store/store';

export type XsNavbarProps = {
  pages: {
    title: string;
    path: string;
  }[];
};

const BoxContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const XsNavbar = ({ pages }: XsNavbarProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const totalPages = [
    ...pages,
    { title: 'SignIn', path: '/signin' },
    { title: 'SignUp', path: '/signup' },
  ];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const isAuthenticate = useIsAuth((state) => state.isAuthenticate);

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
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenNavMenu}
          color='inherit'
        >
          <MenuIcon sx={{ color: theme.palette.secondary.contrastText }} />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages &&
            totalPages.map(({ title, path }) => {
              if (isAuthenticate && (title === 'SignIn' || title === 'SignUp'))
                return;
              if (!isAuthenticate && title === 'Home') return;

              return (
                <NavLink
                  key={path}
                  to={path}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <MenuItem key={title} onClick={handleCloseNavMenu}>
                    <Typography
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: theme.typography.fontWeightBold,
                      }}
                      textAlign='center'
                    >
                      {t(title)}
                    </Typography>
                  </MenuItem>
                </NavLink>
              );
            })}
        </Menu>
      </BoxContainer>
    </>
  );
};
export default XsNavbar;
