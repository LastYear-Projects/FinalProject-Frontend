import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  IconButton,
  TextField,
  Typography,
  styled,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Cancel as CancelIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { ProfitValues, UserType } from '../../../globalTypes';
import { COLORS } from '../../../theme';
import { onKeyPress } from '../../../utils/utils';

const BoxContent = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 0',
  borderBottom: '1px solid #e0e0e0',
});

type ProfileInfoProps = {
  data?: UserType;
  newData?: UserType;
  setNewData: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveNewData: () => void;
  handleCancelEdit: () => void;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  data,
  newData,
  setNewData,
  isEditing,
  setIsEditing,
  handleSaveNewData,
  handleCancelEdit,
}) => {
  const { t } = useTranslation();
  const onChange = (event: any) => {
    const { name, value } = event.target;

    setNewData((prev) => {
      if (!prev) return {} as UserType;

      if (name === 'profitType') {
        return {
          ...prev,
          userPreferences: {
            ...prev.userPreferences,
            profitType: value as ProfitValues,
          },
        };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyPress(e, 'Enter', handleSaveNewData);
    onKeyPress(e, 'Escape', handleCancelEdit);
  };

  const ignoreKeys = () => [
    'creditCards',
    'userPreferences',
    '_id',
    '__v',
    'password',
  ];

  const renderField = (key: string, value: any) => {
    if (key === 'profitType') {
      return isEditing ? (
        <Select
          name={key}
          value={newData?.userPreferences?.profitType || ''}
          onChange={onChange}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value='points'>Points</MenuItem>
          <MenuItem value='lowestPrice'>Lowest Price</MenuItem>
          <MenuItem value='nominalProfit'>Nominal Profit</MenuItem>
        </Select>
      ) : (
        <Typography
          variant='body1'
          sx={{
            flexGrow: 1,
            padding: '0 2rem',
            maxWidth: { xs: '10rem', sm: '50rem' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </Typography>
      );
    }

    return isEditing ? (
      <TextField
        onKeyDown={handleKeyPress}
        name={key}
        onChange={onChange}
        value={newData ? newData[key as keyof UserType] || '' : ''}
      />
    ) : (
      <Typography
        variant='body1'
        sx={{
          flexGrow: 1,
          padding: '0 2rem',
          width: { xs: '10rem', sm: '25rem' },
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {typeof value === 'string' ? value : ''}
      </Typography>
    );
  };

  return (
    <Box>
      {Object.entries(data || {}).map(
        ([key, value]) =>
          !ignoreKeys().includes(key) && (
            <BoxContent key={key}>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: 'bold',
                  minWidth: '100px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t(key)}:
              </Typography>
              {renderField(key, value)}
              {isEditing ? (
                <Box>
                  <IconButton edge='end' onClick={handleCancelEdit}>
                    <CancelIcon sx={{ color: COLORS.ERROR }} />
                  </IconButton>
                  <IconButton edge='end' onClick={handleSaveNewData}>
                    <SaveIcon sx={{ color: COLORS.SUCCESS }} />
                  </IconButton>
                </Box>
              ) : (
                <IconButton edge='end' onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
              )}
            </BoxContent>
          )
      )}
      <BoxContent key='profitType'>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            minWidth: '100px',
            whiteSpace: 'nowrap',
          }}
        >
          {t('profitType')}:
        </Typography>
        {renderField('profitType', data?.userPreferences?.profitType)}
        {isEditing ? (
          <Box>
            <IconButton edge='end' onClick={handleCancelEdit}>
              <CancelIcon sx={{ color: COLORS.ERROR }} />
            </IconButton>
            <IconButton edge='end' onClick={handleSaveNewData}>
              <SaveIcon sx={{ color: COLORS.SUCCESS }} />
            </IconButton>
          </Box>
        ) : (
          <IconButton edge='end' onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        )}
      </BoxContent>
    </Box>
  );
};

export default ProfileInfo;
