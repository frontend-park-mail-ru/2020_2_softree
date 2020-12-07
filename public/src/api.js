export const apiSignUp = () => '/api/users';
export const apiUpdateUser = () => '/api/users/avatar';
export const apiChangePass = () => '/api/users/password';
export const apiSignIn = () => '/api/sessions';
export const apiLogOut = () => '/api/sessions';
export const apiCheckAuth = () => '/api/sessions';

export const apiRates = () => '/api/rates';
export const apiRate = id => `/api/rates/${id}`;

export const apiMarkets = () => '/api/markets';
export const apiUserAccounts = () => '/api/accounts';
export const apiHistory = () => '/api/transactions';
export const apiTransactions = () => '/api/transactions';
export const apiIncome = period => `/api/income/${period}`;
