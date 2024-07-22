import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, TextField, Typography, styled } from '@mui/material';
import {
  Cancel as CancelIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { UserType } from '../../../globalTypes';
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
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewData((prev) =>
      prev ? { ...prev, [name]: value } : ({} as UserType)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyPress(e, 'Enter', handleSaveNewData);
    onKeyPress(e, 'Escape', handleCancelEdit);
  };

  const ignoreKeys = () => ['creditCards', 'userPreferences', '_id'];

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
              {isEditing ? (
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
                    maxWidth: { xs: '10rem', sm: '50rem' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {typeof value === 'string' ? value : ''}
                </Typography>
              )}
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
    </Box>
  );
};

export default ProfileInfo;
