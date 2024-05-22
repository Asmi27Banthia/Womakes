import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css'
import {  useNavigate } from 'react-router-dom';
import { useWarehouseTransactions } from 'src/hooks/useWarehouseTransactions';
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

export default function AddWarehouseTransactions({ open, setOpen, onAddData, }) {
const {WarehouseTransactionsData,setWarehouseTransactionsData, WarehouseTransactionseditData, WarehouseTransactionssetEditData}= useWarehouseTransactions()

const [Product_Id, setProductId] = React.useState('');
const [WareHouseId, setWareHouseId] = React.useState('');

const handleChangeProductId = (event) => {
  setProductId(event.target.value);
};
const handleChangeWareHouseId = (event) => {
  setWareHouseId(event.target.value);
};

useEffect(() => {
  if (WarehouseTransactionseditData) {
    setProductId(Number(WarehouseTransactionseditData?.Product_Id));
  }
}, [WarehouseTransactionseditData]);

useEffect(() => {
  if (WarehouseTransactionseditData) {
    setWareHouseId(Number(WarehouseTransactionseditData?.WareHouseId));
  }
  
}, [WarehouseTransactionseditData]);

const [transaction_type, setTransactionType] = React.useState('');
const handleChangeTransactionType= (event) => {
  setTransactionType(event.target.value);
};
useEffect(() => {
  if (WarehouseTransactionseditData) {
    setTransactionType(Number(WarehouseTransactionseditData?.transaction_type));
  }
  
}, [WarehouseTransactionseditData]);
  const handleClose = () => {
    navigate("/warehousetransactions")
    WarehouseTransactionssetEditData(null);
  };

  const defaultValue = {
   Product_Id:'',
   WareHouseId:'',
   qty:'',
   transaction_type:'',
   transaction_date:''
   
  };

  const generateInitialValues = (props) => {
    if ( WarehouseTransactionseditData) {
      for (const key in defaultValue) {
        if (key in  WarehouseTransactionseditData &&  WarehouseTransactionseditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray( WarehouseTransactionseditData[key]) &&  WarehouseTransactionseditData[key].length > 0
                ?  WarehouseTransactionseditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] =  WarehouseTransactionseditData[key];
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
console.log('WarehouseTransactionsData', WarehouseTransactionsData)

  const navigate = useNavigate()
    const onsubmit = (newRecord) => {
      console.log('newRecord', newRecord)
      if ( WarehouseTransactionseditData) {
        const editedIndex = WarehouseTransactionsData?.findIndex((item) => item.id ===  WarehouseTransactionseditData.id);
        WarehouseTransactionsData?.splice(editedIndex,1, {
          ...newRecord,
          id :  WarehouseTransactionseditData?.id
        })
        setWarehouseTransactionsData(WarehouseTransactionsData)
        WarehouseTransactionssetEditData(null);

        navigate('/warehousetransactions')
      }  else {
        const newId = WarehouseTransactionsData?.length > 0 ? WarehouseTransactionsData[WarehouseTransactionsData?.length - 1].id + 1 : 1;
        const payLoad = {
          ...newRecord,
          id: newId,
        };
        console.log('payLoad', payLoad)
        setWarehouseTransactionsData([...WarehouseTransactionsData, payLoad]);
        WarehouseTransactionssetEditData(null);

        navigate('/warehousetransactions')
      }
  };
  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);
  const [option1, setOption1] = useState([{ label: 'Sale', value: 'Sale' },{ label: 'Restock', value: 'Restock'}]);
  const handleChangeDate=(e)=>{
    console.log(';;;;;;;;;;;;;;;;;',e)
  }
  console.log('errors', errors);
  return (
    <div className='formstart'>
        <h4 className='editadd'>{ WarehouseTransactionseditData ? 'Edit record' : 'Add Record'}</h4>
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
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-WareHouseId-select"
              value={WareHouseId}
              label="WareHouseId"
              name="WareHouseId"
              register={register}
              onChange={handleChangeWareHouseId}
              option={option}
              mainname="WareHouseId"
            />}
        </Box>
            <MainTextField label={'Quantity'} name={'qty'} register={register} />
            <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-transactiontype-select"
              value={transaction_type}
              label="TransactionType"
              name="transaction_type"
              register={register}
              onChange={handleChangeTransactionType}
              option={option1}
              mainname="TransactionType"
            />}
        </Box>
        <MainTextField label={'TransactionDate'} type='date' name={'transaction_date'}  register={register} />
          <Grid className='addeditcancelbtn'>
            <Button onClick={handleClose} color="primary" className='downbtn cancelbtn'>
              Cancel
            </Button>
            <Button color="primary" type="submit" className='downbtn addeditbtn'>
              { WarehouseTransactionseditData ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </form>
    </div>
  );
}
