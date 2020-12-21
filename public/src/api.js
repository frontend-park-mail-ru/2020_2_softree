export const apiSignUp = () => '/api/users';
export const apiUpdateUser = () => '/api/users/avatar';
export const apiChangePass = () => '/api/users/password';
export const apiSignIn = () => '/api/sessions';
export const apiLogOut = () => '/api/sessions';
export const apiCheckAuth = () => '/api/sessions';

export const apiRates = () => '/api/rates';
export const apiInitialRates = () => '/api/rates?initial=true';
export const apiRatesPeriod = (rate, period) => `/api/rates/${rate}?period=${period}`;
export const apiRate = id => `/api/rates/${id}`;

export const apiMarkets = () => '/api/markets';
export const apiUserAccounts = () => '/api/accounts';
export const apiUserAccountsHistory = period => `/api/accounts/history?period=${period}`;
export const apiHistory = () => '/api/transactions';
export const apiPeriodTransactions = period => `/api/transactions?period=${period}`;
export const apiIncome = period => `/api/income/${period}`;
