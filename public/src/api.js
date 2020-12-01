export const apiSignUp = () => '/api/user';
export const apiUpdateUser = () => '/api/user/avatar';
export const apiChangePass = () => '/api/user/password';
export const apiSignIn = () => '/api/session';
export const apiLogOut = () => '/api/session';
export const apiCheckAuth = () => '/api/session';

export const apiRates = () => '/api/rates';
export const apiRate = id => `/api/rates/${id}`;

export const apiMarkets = () => '/api/markets';
export const apiUserAccounts = () => '/api/accounts';
export const apiHistory = () => '/api/transactions';
export const apiTransactions = () => '/api/transactions';
export const apiIncome = period => `/api/income?period=${period}`;
