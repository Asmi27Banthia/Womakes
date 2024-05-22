import axios from 'axios';
import { API_URL } from '../global/constant';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});
const logout = async () => {
  await localStorage.removeItem('jwtToken');
  await localStorage.clear();
  //   store.dispatch(setLogout());
};

export const _setTokenForAPI = async (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = token;
  }
  const data = await localStorage.getItem('jwtToken');
  if (data) {
    const _token = data;
    console.log('_token', _token);
    api.defaults.headers.common.Authorization = _token;
  }
};
_setTokenForAPI();
api.interceptors.request.use(
  (config) => ({
    ...config,
    validateStatus: (status) => status === 200 && status,
  }),
  (error) => Promise.reject(error)
);

api.interceptors.response.use(undefined, (error) => {
  if (error?.toJSON()?.message !== 'Network Error') {
    if (error?.response?.status === 401) {
      //   logout();
      //   Popup.show({
      //     ...modalErrorConfig,
      //     title: "Error",
      //     textBody: "You've been logged out, please log back in.",
      //     buttonText: "Ok",
      //     callback: () => {
      //       Popup.hide();
      //       navigate("Login");
      //     },
      //   });
    } else {
      console.log('error', error);
    }
  }

  return Promise.reject(error);
});

export default api;
