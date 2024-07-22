import { create } from 'zustand';
import { StoreCardProps } from '../component/storeCard/StoreCard';
import { CreditCardType, UserType } from '../globalTypes';

export type StoreState = {
  stores: StoreCardProps[];
  setStores: (stores: StoreCardProps[]) => void;
  getStoreById: (id: string) => StoreCardProps | undefined;
};

export const useStore = create<StoreState>((set, get) => ({
  stores: [],
  setStores: (stores) => set({ stores }),
  getStoreById: (id) => get().stores.find((store) => store._id === id),
}));

export type UserState = {
  user: UserType;
  setUser: (user: UserType) => void;
};

export const useUser = create<UserState>((set) => ({
  user: {} as UserType,
  setUser: (user) => set({ user }),
}));

export type CreditCardState = {
  creditCards: CreditCardType[];
  setCreditCards: (creditCard: CreditCardType[]) => void;
};

export const useCreditCard = create<CreditCardState>((set) => ({
  creditCards: [],
  setCreditCards: (creditCards) => set({ creditCards }),
  removeCreditCard: (id: string) =>
    set((state) => ({
      creditCards: state.creditCards.filter((card) => card._id !== id),
    })),
  addCreditCard: (card: CreditCardType) =>
    set((state) => ({ creditCards: [...state.creditCards, card] })),
}));

export type IsAuth = {
  isAuthenticate: boolean;
  setIsAutenticate: (isAuthenticate: boolean) => void;
};

export const useIsAuth = create<IsAuth>((set) => ({
  isAuthenticate: false,
  setIsAutenticate: (isAuthenticate) => set({ isAuthenticate }),
}));
