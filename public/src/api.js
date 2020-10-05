export const apiSignUp = () =>      '/signup'; // post: {email: str, password1: str, password2: str} -> 200 | 400
export const apiSignIn = () =>      '/signin'; // post: {email: str, password: str} -> 200 | 401
export const apiLogOut = () =>      '/logout'; // post: -> 200
export const apiCheckAuth = () =>   '/auth'; // get: -> 200 {email: str} | 401
export const apiRates = () =>       '/rates'; // get: -> 200 [{title: str, change: float, buy: float, sell: float},]
export const apiRate = id =>        `/rates/${id}`; // get: -> {title: str, change: float, buy: float, sell: float}
