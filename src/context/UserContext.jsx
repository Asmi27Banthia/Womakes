import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [UserData, setUserData] = useState([
    {
      id: 1,
      email:'dd@gmail.com',
      phoneNo:'9998887776',
      countryCode:'067',
      address_Id:'2',
      cardNumber:'4539 1488 0343 6467',
      cardType:'Visa',
      expDate:'06/25',
      cardHolderName:'John Smith',
      user_Id:'1'
    },
    {
      id: 2,
      email:'asmi27banthia@gmail.com',
      phoneNo:'8998887576',
      countryCode:'987',
      address_Id:'3',
      cardNumber:'4916 2615 8468 6705',
      cardType:'MasterCard',
      expDate:'11/27',
      cardHolderName:'Emma Johnson',
      user_Id:'2'
    },
    {
      id: 3,
      email:'malviheena@gmail.com',
      phoneNo:'8948837576',
      countryCode:'122',
      address_Id:'1',
      cardNumber:'4556 7375 8682 6423',
      cardType:'MasterCard',
      expDate:'03/26',
      cardHolderName:'Michael Brown',
      user_Id:'3'
    },
    {
      id: 4,
      email:'abcd@gmail.com',
      phoneNo:'7379016678',
      countryCode:'434',
      address_Id:'1',
      cardNumber:'4716 9484 3587 1250',
      cardType:'American Express',
      expDate:'09/28',
      cardHolderName:'Olivia Davis',
      user_Id:'4'
    },
    {
      id: 5,
      email:'tyuio@gmail.com',
      phoneNo:'8758327587',
      countryCode:'322',
      address_Id:'4',
      cardNumber:'4539 7641 0987 4528',
      cardType:'Visa',
      expDate:'12/29',
      cardHolderName:'James Wilson',
      user_Id:'5'
    },
  ]);

  const [UsereditData, UsersetEditData] = useState(null);

  const contextValues = useMemo(
    () => ({
      UserData,
      setUserData,
      UsereditData,
      UsersetEditData,
    }),
    [UserData, setUserData, UsersetEditData, UsereditData]
  );

  return (
    <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.any,
};
