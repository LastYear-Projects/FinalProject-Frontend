import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCreditCardsQuery, useUserQuery } from '../../hooks/useStores';
import { UserType } from '../../globalTypes';
import { useCreditCard } from '../../store/store';
import ProfileInfo from './sections/ProfileInfo';
import CreditCardSection from './sections/CreditCardSection';
import AddNewCardsSection from './sections/AddNewCardsSection';

const ProfilePage = () => {
  const token = localStorage.getItem('token');
  const { isLoading: isUserLoading } = useUserQuery(token ?? '');
  const currentUser = useUserQuery(token ?? '').data;

  const { isLoading: isFetchAllCardsLoading } = useCreditCardsQuery();
  const creditCards = useCreditCard((state) => state.creditCards);

  const theme = useTheme();
  const [data, setData] = useState<UserType | undefined>(currentUser);
  const [newData, setNewData] = useState<UserType | undefined>(currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreditCardEditing, setIsCreditCardEditing] = useState(false);

  const { t } = useTranslation();

  const filteredCreditCards = creditCards.filter(
    (card) =>
      !currentUser?.creditCards?.some((userCard) => userCard._id === card._id)
  );

  useEffect(() => {
    if (currentUser) {
      setData(currentUser);
      setNewData(currentUser);
    }
  }, [currentUser]);

  const handleSaveNewData = () => {
    if (newData) {
      setData(newData);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setNewData(data);
    setIsEditing(false);
  };

  return isUserLoading ? (
    <CircularProgress sx={{ color: theme.palette.secondary.contrastText }} />
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem',
      }}
    >
      <Typography
        variant='h4'
        sx={{
          margin: '1rem 0 2rem 0',
          fontWeight: theme.typography.fontWeightBold,
          whiteSpace: 'nowrap',
        }}
      >
        {t('Profile Page')}
      </Typography>
      <ProfileInfo
        data={data}
        newData={newData}
        setNewData={setNewData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSaveNewData={handleSaveNewData}
        handleCancelEdit={handleCancelEdit}
      />
      <CreditCardSection
        creditCards={currentUser?.creditCards}
        isCreditCardEditing={isCreditCardEditing}
        setIsCreditCardEditing={setIsCreditCardEditing}
      />
      {isCreditCardEditing && !isFetchAllCardsLoading && (
        <AddNewCardsSection filteredCreditCards={filteredCreditCards} />
      )}
    </Box>
  );
};

export default ProfilePage;
