// All cloud functions can be called through the app from the path '/api/functions/<functionName>
const API_ROOT = '/api/functions';

export const CSRF = `${API_ROOT}/csrf`;
export const HELLO = `${API_ROOT}/hello`;
export const LOGIN = `${API_ROOT}/login`;
export const LOGOUT = `${API_ROOT}/logout`;
export const USER = `${API_ROOT}/user`;
