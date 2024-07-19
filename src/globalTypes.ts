export type ToastifyType = 'info' | 'success' | 'warning' | 'error';
export type ToastifyPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-center';

export type ToastifyProps = {
  type: ToastifyType;
  message: string;
  position: ToastifyPosition;
};

const profitType = {
  POINTS: 'points',
  LOWEST_PRICE: 'lowestPrice',
  NOMINAL_PROFIT: 'nominalProfit',
} as const;

export type ProfitKeys = keyof typeof profitType;
export type ProfitValues = (typeof profitType)[ProfitKeys];

export type CreditCardType = {
  _id: string;
  cardName: string;
  pointValue: number;
};

export type UserPreferencesType = {
  profitType: ProfitValues;
  cardsPreference: CreditCardType[];
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  creditCards: CreditCardType[];
  userPreferences: UserPreferencesType;
};
