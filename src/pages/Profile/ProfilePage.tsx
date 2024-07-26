import { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCreditCardsQuery } from '../../hooks/useStores';
import { UserType } from '../../globalTypes';
import { useCreditCard, useUser } from '../../store/store';
import ProfileInfo from './sections/ProfileInfo';
import CreditCardSection from './sections/CreditCardSection';
import AddNewCardsSection from './sections/AddNewCardsSection';

const ProfilePage = () => {
  const { isLoading: isFetchAllCardsLoading } = useCreditCardsQuery();
  const creditCards = useCreditCard((state) => state.creditCards);

  const currentUser = useUser((state) => state.user);

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

  return (
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
