import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css'
import {  useNavigate } from 'react-router-dom';
import { useAddress } from 'src/hooks/useAddress';
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

export default function AddAdress({ open, setOpen, onAddData, }) {
const {AddressData,setAddressData, AddresseditData, AddresssetEditData}= useAddress()

const [user_Id, setUserId] = React.useState('');
// const [isWarehouse, setisWarehouse] = React.useState('');

const handleChangeUserId = (event) => {
  setUserId(event.target.value);
};
// const handleChangeisWarehouse = (event) => {
//   setisWarehouse(event.target.value);
// };

useEffect(() => {
  if (AddresseditData) {
    setUserId(Number(AddresseditData?.user_Id));
  }
}, [AddresseditData]);

// useEffect(() => {
//   if (AddresseditData) {
//     setisWarehouse(Number(AddresseditData?.isWarehouse));
//   }
  
// }, [AddresseditData]);

// const [type, setType] = React.useState('');
// const handleChangeType= (event) => {
//   setType(event.target.value);
// };
// useEffect(() => {
//   if (AddresseditData) {
//     setType(Number(AddresseditData?.type));
//   }
  
// }, [AddresseditData]);
  const handleClose = () => {
    navigate("/address")
    AddresssetEditData(null);
  };

  const defaultValue = {
   lat:'',
   long:'',
   streetAddress1:'',
   streetAddress2:'',
   pincode:'',
   country:'',
   state:'',
   city:'',
   user_Id:'',
   type:'Warehouse',
   isWarehouse:'True',
  };

  const generateInitialValues = (props) => {
    if ( AddresseditData) {
      for (const key in defaultValue) {
        if (key in  AddresseditData &&  AddresseditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray( AddresseditData[key]) &&  AddresseditData[key].length > 0
                ?  AddresseditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] =  AddresseditData[key];
          }
        }
      }
    }

    return defaultValue;
  };


  // const schema = yup.object().shape({
  //   name: yup.string().required('Name is required.'),
  // });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    defaultValues: generateInitialValues(),
    mode: 'onsubmit',
    reValidateMode: 'onsubmit',
    // resolver: yupResolver(schema),
  });
console.log('AddressData', AddressData)

  const navigate = useNavigate()
    const onsubmit = (newRecord) => {
      console.log('newRecord', newRecord)
      if ( AddresseditData) {
        const editedIndex = AddressData?.findIndex((item) => item.id ===  AddresseditData.id);
        AddressData?.splice(editedIndex,1, {
          ...newRecord,
          id :  AddresseditData?.id
        })
        setAddressData(AddressData)
        AddresssetEditData(null);

        navigate('/address')
      }  else {
        const newId = AddressData?.length > 0 ? AddressData[AddressData?.length - 1].id + 1 : 1;
        const payLoad = {
          ...newRecord,
          id: newId,
        };
        console.log('payLoad', payLoad)
        setAddressData([...AddressData, payLoad]);
        AddresssetEditData(null);

        navigate('/address')
      }
  };
  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);
  // const [option1, setOption1] = useState([{ label: 'User', value: 'User' },{ label: 'Warehouse', value: 'Warehouse'}]);
  // const [option2, setOption2] = useState([{ label: 'True', value: 'True' },{ label: 'False', value: 'False'}]);
  const handleChangeDate=(e)=>{
    console.log(';;;;;;;;;;;;;;;;;',e)
  }
  console.log('errors', errors);
  return (
    <div className='formstart'>
        <h4 className='editadd'>{ AddresseditData ? 'Edit record' : 'Add Record'}</h4>
        <form onSubmit={handleSubmit(onsubmit)}>
        <MainTextField label={'Latitude'} name={'lat'} register={register} />
        <MainTextField label={'Longitude'} name={'long'} register={register} />
        <MainTextField label={'StreetAddress1'} name={'streetAddress1'} register={register} />
        <MainTextField label={'StreetAddress2'} name={'streetAddress2'} register={register} />
        <MainTextField label={'Pincode'} type={'number'} name={'pincode'} register={register} />
        <MainTextField label={'Country'} name={'country'} register={register} />
        <MainTextField label={'State'} name={'state'} register={register} />
        <MainTextField label={'City'} name={'city'} register={register} />
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-UserId-select"
              value={user_Id}
              label="UserId"
              name="user_Id"
              register={register}
              onChange={handleChangeUserId}
              option={option}
              mainname="UserId"
            />}
        </Box>
            {/* <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-type-select"
              value={type}
              label="Type"
              name="type"
              register={register}
              onChange={handleChangeType}
              option={option1}
              mainname="Type"
            />}
        </Box>
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-isWarehouse-select"
              value={isWarehouse}
              label="isWarehouse"
              name="isWarehouse"
              register={register}
              onChange={handleChangeisWarehouse}
              option={option2}
              mainname="isWarehouse"
            />}
        </Box> */}
        <MainTextField label={'Type'} name={'type'} register={register} disabled />
        <MainTextField label={'isWarehouse'} name={'isWarehouse'} register={register} disabled/>
          <Grid className='addeditcancelbtn'>
            <Button onClick={handleClose} color="primary" className='downbtn cancelbtn'>
              Cancel
            </Button>
            <Button color="primary" type="submit" className='downbtn addeditbtn'>
              { AddresseditData ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </form>
    </div>
  );
}
