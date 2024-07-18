import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
} from '@mui/material';
import { ISRAEL_FLAG, USA_FLAG } from '../../constants/constants';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const getLanguageLabel = (lang: string) => {
    return lang === 'en' ? 'en' : 'he';
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <Box display='flex' alignItems='center' sx={{ margin: '0 0.5rem' }}>
      <Select
        sx={{ height: '2rem', width: 'auto' }}
        value={i18n.language}
        onChange={changeLanguage}
        variant='outlined'
        displayEmpty
        renderValue={(value) => (
          <Box display='flex' alignItems='center'>
            {value === 'en' ? (
              <img src={USA_FLAG} alt='English' width='15' height='15' />
            ) : (
              <img src={ISRAEL_FLAG} alt='Hebrew' width='15' height='15' />
            )}
            <Typography variant='body1'>
              {getLanguageLabel(value as string)}
            </Typography>
          </Box>
        )}
      >
        <MenuItem value='en'>
          <Box display='flex' alignItems='center'>
            <img src={USA_FLAG} alt='English' width='15' height='15' />
            <Typography variant='body1' marginLeft={1}>
              English
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem value='he'>
          <Box display='flex' alignItems='center'>
            <img src={ISRAEL_FLAG} alt='Hebrew' width='15' height='15' />
            <Typography variant='body1' marginLeft={1}>
              עברית
            </Typography>
          </Box>
        </MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;
