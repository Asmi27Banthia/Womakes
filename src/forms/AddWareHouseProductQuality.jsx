import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css'
import {  useNavigate } from 'react-router-dom';
import { useWareHouseProductQuality } from 'src/hooks/useWareHouseProductQuality';
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

export default function AddWareHouseProductQuality({ open, setOpen, onAddData, }) {
const {WareHouseProductQualityData,setWareHouseProductQualityData, WareHouseProductQualityeditData, WareHouseProductQualitysetEditData}= useWareHouseProductQuality()

const [Product_Id, setProductId] = React.useState('');
const [passed, setPassed] = React.useState('');

const handleChangeProductId = (event) => {
  setProductId(event.target.value);
};
const handleChangePassed = (event) => {
  setPassed(event.target.value);
};

useEffect(() => {
  if (WareHouseProductQualityeditData) {
    setProductId(Number(WareHouseProductQualityeditData?.Product_Id));
  }
}, [WareHouseProductQualityeditData]);

useEffect(() => {
  if (WareHouseProductQualityeditData) {
    setPassed((WareHouseProductQualityeditData?.passed));
  }
  
}, [WareHouseProductQualityeditData]);

const [transaction_type, setTransactionType] = React.useState('');
const handleChangeTransactionType= (event) => {
  setTransactionType(event.target.value);
};
useEffect(() => {
  if (WareHouseProductQualityeditData) {
    setTransactionType(Number(WareHouseProductQualityeditData?.transaction_type));
  }
  
}, [WareHouseProductQualityeditData]);
  const handleClose = () => {
    navigate("/warehouseproductquality")
    WareHouseProductQualitysetEditData(null);
  };

  const defaultValue = {
   Product_Id:'',
   checkDate:'',
   passed:'',
   checkedBy:'',
   
  };

  const generateInitialValues = (props) => {
    if ( WareHouseProductQualityeditData) {
      for (const key in defaultValue) {
        if (key in  WareHouseProductQualityeditData &&  WareHouseProductQualityeditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray( WareHouseProductQualityeditData[key]) &&  WareHouseProductQualityeditData[key].length > 0
                ?  WareHouseProductQualityeditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] =  WareHouseProductQualityeditData[key];
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
console.log('WareHouseProductQualityData', WareHouseProductQualityData)

  const navigate = useNavigate()
    const onsubmit = (newRecord) => {
      console.log('newRecord', newRecord)
      if ( WareHouseProductQualityeditData) {
        const editedIndex = WareHouseProductQualityData?.findIndex((item) => item.id ===  WareHouseProductQualityeditData.id);
        WareHouseProductQualityData?.splice(editedIndex,1, {
          ...newRecord,
          id :  WareHouseProductQualityeditData?.id
        })
        setWareHouseProductQualityData(WareHouseProductQualityData)
        WareHouseProductQualitysetEditData(null);

        navigate('/warehouseproductquality')
      }  else {
        const newId = WareHouseProductQualityData?.length > 0 ? WareHouseProductQualityData[WareHouseProductQualityData?.length - 1].id + 1 : 1;
        const payLoad = {
          ...newRecord,
          id: newId,
        };
        console.log('payLoad', payLoad)
        setWareHouseProductQualityData([...WareHouseProductQualityData, payLoad]);
        WareHouseProductQualitysetEditData(null);

        navigate('/warehouseproductquality')
      }
  };
  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);
  const [option1, setOption1] = useState([{ label: 'True', value: 'True' },{ label: 'False', value: 'False'}]);
  const handleChangeDate=(e)=>{
    console.log(';;;;;;;;;;;;;;;;;',e)
  }
  console.log('errors', errors);
  return (
    <div className='formstart'>
        <h4 className='editadd'>{ WareHouseProductQualityeditData ? 'Edit record' : 'Add Record'}</h4>
        <form onSubmit={handleSubmit(onsubmit)}>
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-ProductId-select"
              value={Product_Id}
              label="ProductId"
              name="Product_Id"
              register={register}
              onChange={handleChangeProductId}
              option={option}
              mainname="ProductId"
            />}
        </Box>
        <MainTextField label={'CheckDate'} type='date' name={'checkDate'}  register={register} />
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-passed-select"
              value={passed}
              label="passed"
              name="passed"
              register={register}
              onChange={handleChangePassed}
              option={option1}
              mainname="Passed"
            />}
        </Box>
            <MainTextField label={'CheckedBy'} name={'checkedBy'} register={register} />
          <Grid className='addeditcancelbtn'>
            <Button onClick={handleClose} color="primary" className='downbtn cancelbtn'>
              Cancel
            </Button>
            <Button color="primary" type="submit" className='downbtn addeditbtn'>
              { WareHouseProductQualityeditData ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </form>
    </div>
  );
}
