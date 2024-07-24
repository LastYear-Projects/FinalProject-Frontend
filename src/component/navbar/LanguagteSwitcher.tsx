import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
} from '@mui/material';
import {
  CHINA_FLAG,
  FRENCH_FLAG,
  ISRAEL_FLAG,
  USA_FLAG,
} from '../../constants/constants';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'en':
        return 'en';
      case 'he':
        return 'he';
      case 'fr':
        return 'fr';
      case 'zh':
        return 'ch';
    }
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const displayFlagImage = (value: string) => {
    switch (value) {
      case 'en':
        return <img src={USA_FLAG} alt='English' width='15' height='15' />;
      case 'he':
        return <img src={ISRAEL_FLAG} alt='Hebrew' width='15' height='15' />;
      case 'fr':
        return <img src={FRENCH_FLAG} alt='French' width='15' height='15' />;
      case 'zh':
        return <img src={CHINA_FLAG} alt='China' width='15' height='15' />;
    }
  };

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
            {displayFlagImage(value)}
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
        <MenuItem value='fr'>
          <Box display='flex' alignItems='center'>
            <img src={FRENCH_FLAG} alt='French' width='15' height='15' />
            <Typography variant='body1' marginLeft={1}>
              Français
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem value='zh'>
          <Box display='flex' alignItems='center'>
            <img src={CHINA_FLAG} alt='China' width='15' height='15' />
            <Typography variant='body1' marginLeft={1}>
              中国人
            </Typography>
          </Box>
        </MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;
