import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css'
import {  useNavigate } from 'react-router-dom';
import { useUser } from 'src/hooks/useUser';
import MainTextField from './MainTextField';
import Maindropdown from './Maindropdown';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddUser({ open, setOpen, onAddData, }) {
const {UserData,setUserData, UsereditData, UsersetEditData}= useUser()
  
  console.log(' UsereditData',  UsereditData)
  
  const [address_Id, setAddressId] = React.useState('');
  const handleChangeAddressId = (event) => {
    setAddressId(event.target.value);
  };
  useEffect(() => {
    if (UsereditData) {
      setAddressId(Number(UsereditData?.address_Id));
    }
  }, [UsereditData]);
  const handleClose = () => {
    navigate("/user")
    UsersetEditData(null);
  };

  const defaultValue = {
    email:'',
    phoneNo:'',
    countryCode:'',
    address_Id:'',
    password:'',
    otp:''

  };

  const generateInitialValues = (props) => {
    if ( UsereditData) {
      console.log('editData11111',  UsereditData)
      for (const key in defaultValue) {
        if (key in  UsereditData &&  UsereditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray( UsereditData[key]) &&  UsereditData[key].length > 0
                ?  UsereditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] =  UsereditData[key];
          }
        }
      }
    }

    return defaultValue;
  };


  const schema = yup.object().shape({
    password: yup.string().required('Password is required.'),
    otp: yup.string().required('Otp is required.'),
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    defaultValues: generateInitialValues(),
    mode: 'onsubmit',
    reValidateMode: 'onsubmit',
    resolver: yupResolver(schema),
  });
console.log('UserData', UserData)

  const navigate = useNavigate()
    const onsubmit = (newRecord) => {
      console.log('newRecord', newRecord)
      if ( UsereditData) {
        const editedIndex = UserData?.findIndex((item) => item.id ===  UsereditData.id);
        UserData?.splice(editedIndex,1, {
          ...newRecord,
          id :  UsereditData?.id
        })
        setUserData(UserData)
        UsersetEditData(null);

        navigate('/user')
      }  else {
        const newId = UserData?.length > 0 ? UserData[UserData?.length - 1].id + 1 : 1;
        const payLoad = {
          ...newRecord,
          id: newId,
        };
        console.log('payLoad', payLoad)
        setUserData([...UserData, payLoad]);
        UsersetEditData(null);

        navigate('/user')
      }
  };
  const handleChangeDate=(e)=>{
    console.log(';;;;;;;;;;;;;;;;;',e)
  }
  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);
  console.log('errors', errors);
  return (
    <div className='formstart'>
        <h4 className='editadd'>{ UsereditData ? 'Edit record' : 'Add Record'}</h4>
        <form onSubmit={handleSubmit(onsubmit)}>
        <MainTextField label={'Email'} type={'email'} name={'email'}  register={register}  />
        <MainTextField label={'PhoneNo'} type={'number'} name={'phoneNo'}  register={register}  />
        <MainTextField label={'CountryCode'}   type={'number'} name={'countryCode'}  register={register}  />
        <MainTextField label={'Password'}  type={'password'} name={'password'}  register={register} error={errors?.password} />
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-AddressId-select"
              value={address_Id}
              label="AddressId"
              name="address_Id"
              register={register}
              onChange={handleChangeAddressId}
              option={option}
              mainname="AddressId"
            />}
        </Box>
        <MainTextField label={'Otp'} type={'number'}  name={'otp'}  register={register} error={errors?.otp}  />

          <Grid className='addeditcancelbtn'>
            <Button onClick={handleClose} color="primary" className='downbtn cancelbtn'>
              Cancel
            </Button>
            <Button color="primary" type="submit" className='downbtn addeditbtn'>
              { UsereditData ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </form>
    </div>
  );
}
