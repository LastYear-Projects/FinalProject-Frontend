import { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCreditCardsQuery } from '../../hooks/useStores';
import { UserType } from '../../globalTypes';
import { useCreditCard, useUser } from '../../store/store';
import ProfileInfo from './sections/ProfileInfo';
import CreditCardSection from './sections/CreditCardSection';
import AddNewCardsSection from './sections/AddNewCardsSection';
import axiosRequest from '../../utils/restApi';
import { toastify } from '../../utils/utils';

const ProfilePage = () => {
  const { isLoading: isFetchAllCardsLoading } = useCreditCardsQuery();
  const creditCards = useCreditCard((state) => state.creditCards);

  const currentUser = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

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

  const handleSaveNewData = async () => {
    if (newData) {
      const originalCreditCards = newData.creditCards;
      const mappedCreditCards = originalCreditCards.map((card) => card._id);
      const updatedData = {
        ...newData,
        creditCards: mappedCreditCards,
      };

      const response = await axiosRequest({
        url: '/users/',
        method: 'PUT',
        data: { userId: updatedData._id, ...updatedData },
      });

      if (response.status === 200) {
        const newUpdatedData = { ...newData, creditCards: originalCreditCards };
        setData(newUpdatedData);
        setNewData(newUpdatedData);
        setUser(newUpdatedData);
        setIsEditing(false);
      } else {
        toastify({
          message: 'Something wrong',
          type: 'error',
          position: 'top-right',
        });
      }
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
