import React, { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const LoaderContext = createContext({});

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const contextValues = useMemo(
    () => ({
      loading,
      setLoading: (val) => setLoading(val),
    }),
    [loading]
  );

  return <LoaderContext.Provider value={contextValues}>{children}</LoaderContext.Provider>;
};

LoaderProvider.propTypes = {
  children: PropTypes.any,
};
