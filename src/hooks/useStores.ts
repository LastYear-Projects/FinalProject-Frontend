import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StoreCardProps } from '../component/storeCard/StoreCard';
import { useCreditCard, useStore, useUser } from '../store/store';
import { getBaseUrl } from '../utils/utils';
import { CreditCardType, UserType } from '../globalTypes';

export const fetchStores = async (): Promise<StoreCardProps[]> => {
  try {
    const response = await axios.get(`${getBaseUrl()}/businesses`);
    return response.data;
  } catch (e: any) {
    console.error(e?.message);
  }
  return [];
};

export const useStoresQuery = () => {
  const setStores = useStore((state) => state.setStores);

  return useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      return fetchStores().then((data) => {
        setStores(data);
        return data;
      });
    },
  });
};

const fetchUser = async (token: string): Promise<UserType> => {
  try {
    //TODO - implement the user endpoint
    // const response = await axios.get(`${getBaseUrl()}/user/${token}`);
    // return response.data;
    return {
      _id: '668c444743aa2aa364d796a2',
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      creditCards: [
        {
          _id: '6658b67e892bce96bd5d588d',
          cardName: 'Bit|MasterCard',
          pointValue: 0,
        },
        {
          _id: '6658b688892bce96bd5d588f',
          cardName: 'I Need It|MasterCard',
          pointValue: 3,
        },
        {
          _id: '6658b690892bce96bd5d5891',
          cardName: 'I Need It|Visa',
          pointValue: 5,
        },
      ],
      userPreferences: {
        profitType: 'lowestPrice',
        cardsPreference: [],
      },
    };
  } catch (e: any) {
    console.error(e?.message);
  }
  return {} as UserType;
};

export const useUserQuery = (token: string) => {
  const setUser = useUser((state) => state.setUser);

  return useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      return fetchUser(token).then((data) => {
        setUser(data);
        return data;
      });
    },
  });
};

const fetchCreditCards = async (): Promise<CreditCardType[]> => {
  try {
    const response = await axios.get(`${getBaseUrl()}/cards`);
    return response.data;
  } catch (e: any) {
    console.error(e?.message);
  }
  return [];
};

export const useCreditCardsQuery = () => {
  const setCreditCard = useCreditCard((state) => state.setCreditCards);

  return useQuery({
    queryKey: ['creditCards'],
    queryFn: async () => {
      return fetchCreditCards().then((data) => {
        setCreditCard(data);
        return data;
      });
    },
  });
};
