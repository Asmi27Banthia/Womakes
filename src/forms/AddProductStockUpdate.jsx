import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import './AddRecords.css';
import { useNavigate } from 'react-router-dom';
import { useProductStockUpdate } from 'src/hooks/useProductStockUpdate';
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

export default function AddProductStockUpdate({ open, setOpen, onAddData }) {
  const { ProductStockUpdateData, setProductStockUpdateData, ProductStockUpdateeditData, ProductStockUpdatesetEditData } = useProductStockUpdate();

  const [Product_Id, setProduct_Id] = React.useState('');
  const [Request_Id, setRequest_Id] = React.useState('');
  const [Stock_Id, setStock_Id] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [WareHouseId, setWareHouseId] = React.useState('');
  const handleChangeProductId = (event) => {
    setProduct_Id(event.target.value);
  };
  const handleChangeRequestId = (event) => {
    setRequest_Id(event.target.value);
  };
  const handleChangeStockId = (event) => {
    setStock_Id(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeWareHouseId = (event) => {
    console.log('event', event)
    setWareHouseId(event.target.value);
  };
  
  useEffect(() => {
    if(ProductStockUpdateeditData) {
        setProduct_Id(Number(ProductStockUpdateeditData?.Product_Id))
    }
  }, [ProductStockUpdateeditData])
  useEffect(() => {
    if(ProductStockUpdateeditData) {
      setRequest_Id(Number(ProductStockUpdateeditData?.Request_Id))
    }
  }, [ProductStockUpdateeditData])
  useEffect(() => {
    if(ProductStockUpdateeditData) {
      setStock_Id(Number(ProductStockUpdateeditData?.Stock_Id))
    }
  }, [ProductStockUpdateeditData])
  useEffect(() => {
    if(ProductStockUpdateeditData) {
      setStatus((ProductStockUpdateeditData?.status))
    }
  }, [ProductStockUpdateeditData])
 
  useEffect(() => {
    if(ProductStockUpdateeditData) {
      setWareHouseId(Number(ProductStockUpdateeditData?.WareHouseId))
    }
  }, [ProductStockUpdateeditData])
  
  
  
 
  const handleClose = () => {
    navigate('/productstockupdate');
    ProductStockUpdatesetEditData(null);
  };

  const defaultValue = {
    Product_Id: '',
    Request_Id:'',
    Stock_Id:'',
    currentQty:'',
    addedQty:'',
    minusQty:'',
    finalQty:'',
    WareHouseId: '',
   
  };

  const generateInitialValues = (props) => {
    if (ProductStockUpdateeditData) {
      for (const key in defaultValue) {
        if (key in ProductStockUpdateeditData && ProductStockUpdateeditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(ProductStockUpdateeditData[key]) && ProductStockUpdateeditData[key].length > 0
                ? ProductStockUpdateeditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = ProductStockUpdateeditData[key];
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
  console.log('ProductStockUpdateData', ProductStockUpdateData);

  const navigate = useNavigate();
  const onsubmit = (newRecord) => {
    console.log('newRecord', newRecord);
    if (ProductStockUpdateeditData) {
      const editedIndex = ProductStockUpdateData?.findIndex((item) => item.id === ProductStockUpdateeditData.id);
      ProductStockUpdateData?.splice(editedIndex, 1, {
        ...newRecord,
        id: ProductStockUpdateeditData?.id,
      });
      setProductStockUpdateData(ProductStockUpdateData);
      ProductStockUpdatesetEditData(null);

      navigate('/productstockupdate');
    } else {
      const newId = ProductStockUpdateData?.length > 0 ? ProductStockUpdateData[ProductStockUpdateData?.length - 1].id + 1 : 1;
      const payLoad = {
        ...newRecord,
        id: newId,
      };
      console.log('payLoad', payLoad);
      setProductStockUpdateData([...ProductStockUpdateData, payLoad]);
      ProductStockUpdatesetEditData(null);

      navigate('/productstockupdate');
    }
  };
  
  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);
  const [option1, setOption1] = useState([{ label: 'Active', value: 'Active' },{ label: 'Not Active', value: 'Not Active'}]);
  return (
    <div className="formstart">
      <h4 className="editadd">{ProductStockUpdateeditData ? 'Edit record' : 'Add Record'}</h4>
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
              id="demo-RequestId-select"
              value={Request_Id}
              label="RequestId"
              name="Request_Id"
              register={register}
              onChange={handleChangeRequestId}
              option={option}
              mainname="RequestId"
            />}
        </Box>
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-StockId-select"
              value={Stock_Id}
              label="StockId"
              name="Stock_Id"
              register={register}
              onChange={handleChangeStockId}
              option={option}
              mainname="StockId"
            />}
        </Box>
        <MainTextField label={'CurrentQty'} name={'currentQty'} register={register} />
        <MainTextField label={'AddedtQty'} name={'addedQty'} register={register} />
        <MainTextField label={'MinusQty'} name={'minusQty'} register={register} />
        <MainTextField label={'FinalQty'} name={'finalQty'} register={register} />
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-Status-select"
              value={status}
              label="Status"
              name="status"
              register={register}
              onChange={handleChangeStatus}
              option={option1}
              mainname="Status"
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
            {ProductStockUpdateeditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
