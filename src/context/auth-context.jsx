import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { LoaderContext } from './loader-context';
// import { Cookies, useCookies } from "react-cookie";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  //   const [cookies] = useCookies();

  const loginUser = useCallback(() => {
    try {
      setLoading(true);
    } catch (error) {
      setLoading(false);
      setLoggedIn(false);
      toast.error('something went to wrong!');
    }
  }, [setLoading, setLoggedIn]);

  const contextValues = useMemo(
    () => ({
      isLoggedIn,
      loginUser,
      setLoggedIn,
    }),
    [isLoggedIn, loginUser, setLoggedIn]
  );

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
