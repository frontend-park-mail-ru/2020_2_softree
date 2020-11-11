export const apiSignUp = () => '/api/users'; // post: {email: str, password: str} -> 200 | 400
export const apiUpdateUser = () => '/api/users'; // put: {avatar: str} -> 200 | 500
export const apiSignIn = () => '/api/sessions'; // post: {email: str, password: str} -> 200 | 401
export const apiLogOut = () => '/api/sessions'; // delete: -> 200
export const apiCheckAuth = () => '/api/sessions'; // get: -> 200 {email: str} | 401
export const apiRates = () => '/api/rates'; // get: [{title: str, change: float, buy: float, sell: float},] -> 200 | 400
export const apiRate = id => `/api/rates/${id}`; // get: {title: str, change: float, buy: float, sell: float} -> 200 | 400
export const apiChangePass = () => '/api/users/change-password'; // put: {old_password: str, new_password: str} -> 200 | 400
export const apiMarkets = () => '/api/markets';
