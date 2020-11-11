export const apiSignUp = () => '/users'; // post: {email: str, password: str} -> 200 | 400
export const apiUpdateUser = () => '/users'; // put: {avatar: str} -> 200 | 500
export const apiSignIn = () => '/sessions'; // post: {email: str, password: str} -> 200 | 401
export const apiLogOut = () => '/sessions'; // delete: -> 200
export const apiCheckAuth = () => '/sessions'; // get: -> 200 {email: str} | 401
export const apiRates = () => '/rates'; // get: [{title: str, change: float, buy: float, sell: float},] -> 200 | 400
export const apiRate = id => `/rates/${id}`; // get: {title: str, change: float, buy: float, sell: float} -> 200 | 400
export const apiChangePass = () => '/users/change-password'; // put: {old_password: str, new_password: str} -> 200 | 400
