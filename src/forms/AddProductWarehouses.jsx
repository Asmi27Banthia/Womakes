import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css';
import { useNavigate } from 'react-router-dom';
import { useProductWarehouses } from 'src/hooks/useProductWarehouses';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Maindropdown from './Maindropdown';

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

export default function AddProductWarehouses({ open, setOpen, onAddData }) {
  const { ProductWarehousesData, setProductWarehouses, ProductWarehouseseditData, ProductWarehousessetEditData } = useProductWarehouses();

  console.log(' ProductWarehouseseditData', ProductWarehouseseditData);

  const [Product_Id, setProductId] = React.useState('');
  const [WareHouseId, setWareHouseId] = React.useState('');
    
  const handleChangeProductId = (event) => {
    setProductId(event.target.value);
  };
  const handleChangeWareHouseId = (event) => {
    setWareHouseId(event.target.value);
  };
  useEffect(() => {
    if(ProductWarehouseseditData) {
      setProductId((ProductWarehouseseditData?.Product_Id))
    }
  }, [ProductWarehouseseditData])
  useEffect(() => {
    if(ProductWarehouseseditData) {
      setWareHouseId(Number(ProductWarehouseseditData?.WareHouseId))
    }
  }, [ProductWarehouseseditData])
 
  
  const handleClose = () => {
    navigate('/productwarehouses');
    ProductWarehousessetEditData(null);
  };

  const defaultValue = {
    Product_Id:'',
    WareHouseId: '',
  };

  const generateInitialValues = (props) => {
    if (ProductWarehouseseditData) {
      for (const key in defaultValue) {
        if (key in ProductWarehouseseditData && ProductWarehouseseditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(ProductWarehouseseditData[key]) && ProductWarehouseseditData[key].length > 0
                ? ProductWarehouseseditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = ProductWarehouseseditData[key];
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
  console.log('ProductWarehousesData', ProductWarehousesData);

  const navigate = useNavigate();
  const onsubmit = (newRecord) => {
    console.log('newRecord', newRecord);
    if (ProductWarehouseseditData) {
      const editedIndex = ProductWarehousesData?.findIndex((item) => item.id === ProductWarehouseseditData.id);
      ProductWarehousesData?.splice(editedIndex, 1, {
        ...newRecord,
        id: ProductWarehouseseditData?.id,
      });
      setProductWarehouses(ProductWarehousesData);
      ProductWarehousessetEditData(null);

      navigate('/productwarehouses');

    } else {
      const newId = ProductWarehousesData?.length > 0 ? ProductWarehousesData[ProductWarehousesData?.length - 1].id + 1 : 1;
      const payLoad = {
        ...newRecord,
        id: newId,
      };
      console.log('payLoad', payLoad);
      setProductWarehouses([...ProductWarehousesData, payLoad]);
      ProductWarehousessetEditData(null);

      navigate('/productwarehouses');
    }
  };
  

  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);

  return (
    <div className="formstart">
      <h4 className="editadd">{ProductWarehouseseditData ? 'Edit record' : 'Add Record'}</h4>
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
        <Grid className="addeditcancelbtn">
          <Button onClick={handleClose} color="primary" className="downbtn cancelbtn">
            Cancel
          </Button>
          <Button color="primary" type="submit" className="downbtn addeditbtn">
            {ProductWarehouseseditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
