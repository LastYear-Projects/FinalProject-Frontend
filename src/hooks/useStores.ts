import { useQuery } from '@tanstack/react-query';
import { StoreCardProps } from '../component/storeCard/StoreCard';
import { useCreditCard, useStore, useUser } from '../store/store';
import { CreditCardType, UserType } from '../globalTypes';
import axiosRequest from '../utils/restApi';

export const fetchStores = async (): Promise<StoreCardProps[]> => {
  try {
    const response = await axiosRequest({ url: '/businesses', method: 'GET' });
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
          cardName: 'Bit',
          pointValue: 0,
          cardBrand: 'MasterCard',
        },
        {
          _id: '6658b688892bce96bd5d588f',
          cardName: 'I Need It',
          pointValue: 3,
          cardBrand: 'MasterCard',
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
    const response = await axiosRequest({ url: '/cards', method: 'GET' });
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
