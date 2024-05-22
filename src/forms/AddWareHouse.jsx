import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css'
import {  useNavigate } from 'react-router-dom';
import { useWarehouse } from 'src/hooks/useWarehouse';
import MainTextField from './MainTextField';

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

export default function AddWareHouse({ open, setOpen, onAddData, }) {
const {WarehouseData,setWarehouseData, WarehouseeditData, WarehousesetEditData}= useWarehouse()
  
  console.log(' WarehouseeditData',  WarehouseeditData)
  const handleOpen = () => setOpen(true);
  const [date,setDate]=useState('1999-01-01')
  
  
  const handleClose = () => {
    navigate("/warehouse")
    WarehousesetEditData(null);
  };

  const defaultValue = {
    name:  '',
    city:'',
    location: '', 
    pincode:'',
    address:'',
    createdBy:'Asmi Banthia',
    approvedBy:'Asmi Banthia'
   
  };

  const generateInitialValues = (props) => {
    if ( WarehouseeditData) {
      console.log('editData11111',  WarehouseeditData)
      for (const key in defaultValue) {
        if (key in  WarehouseeditData &&  WarehouseeditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray( WarehouseeditData[key]) &&  WarehouseeditData[key].length > 0
                ?  WarehouseeditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] =  WarehouseeditData[key];
          }
        }
      }
    }

    return defaultValue;
  };

  // useEffect(() => {
  //   if(editData){
  //     reset(generateInitialValues());
  //   }
  // }, [editData]);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required.'),
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
console.log('WarehouseData', WarehouseData)

  const navigate = useNavigate()
    const onsubmit = (newRecord) => {
      console.log('newRecord', newRecord)
      if ( WarehouseeditData) {
        const editedIndex = WarehouseData?.findIndex((item) => item.id ===  WarehouseeditData.id);
        WarehouseData?.splice(editedIndex,1, {
          ...newRecord,
          id :  WarehouseeditData?.id
        })
        setWarehouseData(WarehouseData)
        WarehousesetEditData(null);

        navigate('/warehouse')
      }  else {
        const newId = WarehouseData?.length > 0 ? WarehouseData[WarehouseData?.length - 1].id + 1 : 1;
        const payLoad = {
          ...newRecord,
          id: newId,
        };
        console.log('payLoad', payLoad)
        setWarehouseData([...WarehouseData, payLoad]);
        WarehousesetEditData(null);

        navigate('/warehouse')
      }
  };
  const handleChangeDate=(e)=>{
    console.log(';;;;;;;;;;;;;;;;;',e)
  }
  console.log('errors', errors);
  return (
    <div className='formstart'>
        <h4 className='editadd'>{ WarehouseeditData ? 'Edit record' : 'Add Record'}</h4>
        <form onSubmit={handleSubmit(onsubmit)}>
            <MainTextField label={'Name'} name={'name'} register={register} error={errors?.name}/>
             <MainTextField label={'City'} name={'city'} register={register}/>
             <MainTextField label={'Location'} name={'location'}  register={register}/>
             <MainTextField label={'Address'} name={'address'} register={register}/>
            <MainTextField label="Pincode" name="pincode" register={register}/>
            <MainTextField label={'CreatedBy'} name={'createdBy'} register={register}/>
             <MainTextField label={'ApprovedBy'} name={'approvedBy'} register={register}/>
          <Grid className='addeditcancelbtn'>
            <Button onClick={handleClose} color="primary" className='downbtn cancelbtn'>
              Cancel
            </Button>
            <Button color="primary" type="submit" className='downbtn addeditbtn'>
              { WarehouseeditData ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </form>
    </div>
  );
}
