import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useProductStockRequest } from 'src/hooks/useProductStockRequest';
import MainTextField from './MainTextField';
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

export default function AddProduct({ open, setOpen, onAddData }) {
  const { ProductStockRequestData, setProductStockRequestData, ProductStockRequesteditData, ProductStockRequestsetEditData } = useProductStockRequest();

  const [Product_Id, setProduct_Id] = React.useState('');
  const [Stock_Id, setStock_Id] = React.useState('');
  const [WareHouseId, setWareHouseId] = React.useState('');
 
  const handleChangeProductId = (event) => {
    setProduct_Id(event.target.value);
  };
  const handleChangeStockId = (event) => {
    setStock_Id(event.target.value);
  };
 
  const handleChangeWareHouseId = (event) => {
    setWareHouseId(event.target.value);
  };

  useEffect(() => {
    if(ProductStockRequesteditData) {
        setProduct_Id((ProductStockRequesteditData?.Product_Id))
    }
  }, [ProductStockRequesteditData])
  useEffect(() => {
    if (ProductStockRequesteditData) {
        setStock_Id(Number(ProductStockRequesteditData?.Stock_Id));
    }
  }, [ProductStockRequesteditData]);
  useEffect(() => {
    if (ProductStockRequesteditData) {
      setWareHouseId(Number(ProductStockRequesteditData?.WareHouseId));
    }
  }, [ProductStockRequesteditData]);
 
  const handleClose = () => {
    navigate('/productstockrequest');
    ProductStockRequestsetEditData(null);
  };

  const defaultValue = {
    Product_Id: '',
    Stock_Id:'',
    addedQty: '',
    totalQty: '',
    minusQty: '',
    addedBy: '',
    approvedBy: 'Asmi Banthia',
    WareHouseId: '',
  };

  const generateInitialValues = (props) => {
    if (ProductStockRequesteditData) {
      for (const key in defaultValue) {
        if (key in ProductStockRequesteditData && ProductStockRequesteditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(ProductStockRequesteditData[key]) && ProductStockRequesteditData[key].length > 0
                ? ProductStockRequesteditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = ProductStockRequesteditData[key];
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
    // resolver: yupResolver(schema),
  });
  console.log('ProductStockRequestData', ProductStockRequestData);

  const navigate = useNavigate();
  const onsubmit = (newRecord) => {
    console.log('newRecord', newRecord);
    if (ProductStockRequesteditData) {
      const editedIndex = ProductStockRequestData?.findIndex((item) => item.id === ProductStockRequesteditData.id);
      ProductStockRequestData?.splice(editedIndex, 1, {
        ...newRecord,
        id: ProductStockRequesteditData?.id,
      });
      setProductStockRequestData(ProductStockRequestData);
      ProductStockRequestsetEditData(null);

      navigate('/product');
    } else {
      const newId =
        ProductStockRequestData?.length > 0 ? ProductStockRequestData[ProductStockRequestData?.length - 1].id + 1 : 1;
      const payLoad = {
        ...newRecord,
        id: newId,
      };
      console.log('payLoad', payLoad);
      setProductStockRequestData([...ProductStockRequestData, payLoad]);
      ProductStockRequestsetEditData(null);

      navigate('/productstockrequest');
    }
  };

  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);

  return (
    <div className="formstart">
      <h4 className="editadd">{ProductStockRequesteditData ? 'Edit record' : 'Add Record'}</h4>
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
        <MainTextField label={'AddedtQty'} name={'addedQty'} register={register} />
        <MainTextField label={'TotalQty'} name={'totalQty'} register={register} />
        <MainTextField label={'MinusQty'} name={'minusQty'} register={register} />
        <MainTextField label={'AddedBy'} name={'addedBy'} register={register} />
        <MainTextField label={'ApprovedBy'} name={'approvedBy'} register={register} />
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
            {ProductStockRequesteditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
