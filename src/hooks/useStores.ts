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

const fetchUser = async (): Promise<any> => {
  try {
    //TODO - implement the user endpoint
    return axiosRequest({
      url: '/auth/',
      method: 'GET',
    });
  } catch (e: any) {
    console.error(e?.message);
  }
  return {} as UserType;
};

export const useUserQuery = () => {
  const setUser = useUser((state) => state.setUser);

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return fetchUser().then((data) => {
        setUser(data);
        return data.data;
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
