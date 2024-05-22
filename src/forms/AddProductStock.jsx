import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css';
import { useNavigate } from 'react-router-dom';
import { useProductStock } from 'src/hooks/useProductStock';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Maindropdown from './Maindropdown';
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

export default function AddProductStock({ open, setOpen, onAddData }) {
  const { ProductStockData, setProductStockData, ProductStockeditData, ProductStocksetEditData } = useProductStock();

  const [Product_Id, setProduct_Id] = React.useState('');
  const [WareHouseId, setWareHouseId] = React.useState('');
  const handleChangeProductId = (event) => {
    setProduct_Id(event.target.value);
  };
  const handleChangeWareHouseId = (event) => {
    console.log('event', event)
    setWareHouseId(event.target.value);
  };
  
  useEffect(() => {
    if(ProductStockeditData) {
        setProduct_Id(Number(ProductStockeditData?.Product_Id))
    }
  }, [ProductStockeditData])
 
  useEffect(() => {
    if(ProductStockeditData) {
      setWareHouseId(Number(ProductStockeditData?.WareHouseId))
    }
  }, [ProductStockeditData])
  
  
  
 
  const handleClose = () => {
    navigate('/productstock');
    ProductStocksetEditData(null);
  };

  const defaultValue = {
    Product_Id: '',
    quantity:'',
    WareHouseId: '',
   
  };

  const generateInitialValues = (props) => {
    if (ProductStockeditData) {
      for (const key in defaultValue) {
        if (key in ProductStockeditData && ProductStockeditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(ProductStockeditData[key]) && ProductStockeditData[key].length > 0
                ? ProductStockeditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = ProductStockeditData[key];
          }
        }
      }
    }

    return defaultValue;
  };


  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm({
    defaultValues: generateInitialValues(),
    mode: 'onsubmit',
    reValidateMode: 'onsubmit',
  });
  console.log('ProductStockData', ProductStockData);

  const navigate = useNavigate();
  const onsubmit = (newRecord) => {
    console.log('newRecord', newRecord);
    if (ProductStockeditData) {
      const editedIndex = ProductStockData?.findIndex((item) => item.id === ProductStockeditData.id);
      ProductStockData?.splice(editedIndex, 1, {
        ...newRecord,
        id: ProductStockeditData?.id,
      });
      setProductStockData(ProductStockData);
      ProductStocksetEditData(null);

      navigate('/productstock');
    } else {
      const newId = ProductStockData?.length > 0 ? ProductStockData[ProductStockData?.length - 1].id + 1 : 1;
      const payLoad = {
        ...newRecord,
        id: newId,
      };
      console.log('payLoad', payLoad);
      setProductStockData([...ProductStockData, payLoad]);
      ProductStocksetEditData(null);

      navigate('/productstock');
    }
  };
  
  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);

  return (
    <div className="formstart">
      <h4 className="editadd">{ProductStockeditData ? 'Edit record' : 'Add Record'}</h4>
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
        <MainTextField label={'Quantity'} name={'quantity'} register={register} />
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
        <Grid className="addeditcancelbtn">
          <Button onClick={handleClose} color="primary" className="downbtn cancelbtn">
            Cancel
          </Button>
          <Button color="primary" type="submit" className="downbtn addeditbtn">
            {ProductStockeditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
