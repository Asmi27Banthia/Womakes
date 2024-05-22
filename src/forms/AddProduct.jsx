import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useProduct } from 'src/hooks/useProduct';

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
  const { ProductData, setProductData, ProducteditData, ProductsetEditData } = useProduct();

  const [status, setStatus] = React.useState('');
  const [approvedDate,setapprovedDate]=useState('1999-01-01')
  const [Vendor_Id, setVendor_Id] = React.useState('');
  const [Category_Id, setCategory_Id] = React.useState('');
  const [SubCategory_Id, setSubCategory_Id] = React.useState('');
  const [WareHouseId, setWareHouseId] = React.useState('');
 
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeVendorId = (event) => {
    setVendor_Id(event.target.value);
  };
  const handleChangeCategoryId = (event) => {
    setCategory_Id(event.target.value);
  };
  const handleChangeSubCategoryId = (event) => {
    setSubCategory_Id(event.target.value);
  };
 
  const handleChangeWareHouseId = (event) => {
    setWareHouseId(event.target.value);
  };

  useEffect(() => {
    if(ProducteditData) {
      setStatus((ProducteditData?.status))
    }
  }, [ProducteditData])
  useEffect(() => {
    if (ProducteditData) {
      setVendor_Id(Number(ProducteditData?.Vendor_Id));
    }
  }, [ProducteditData]);
  useEffect(() => {
    if (ProducteditData) {
      setCategory_Id(Number(ProducteditData?.Category_Id));
    }
  }, [ProducteditData]);
  useEffect(() => {
    if (ProducteditData) {
      setSubCategory_Id(Number(ProducteditData?.SubCategory_Id));
    }
  }, [ProducteditData]);
  useEffect(() => {
    if (ProducteditData) {
      setWareHouseId(Number(ProducteditData?.WareHouseId));
    }
  }, [ProducteditData]);
 
  const handleClose = () => {
    navigate('/product');
    ProductsetEditData(null);
  };

  const defaultValue = {
    Product_name: '',
    ProductImage:'',
    sku: '',
    price: '',
    weight: '',
    description: '',
    status: '',
    approvedBy: 'Asmi Banthia',
    approvedDate: '',
    Vendor_Id: '',
    Category_Id: '',
    SubCategory_Id: '',
    WareHouseId: '',
  };

  const generateInitialValues = (props) => {
    if (ProducteditData) {
      for (const key in defaultValue) {
        if (key in ProducteditData && ProducteditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(ProducteditData[key]) && ProducteditData[key].length > 0
                ? ProducteditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = ProducteditData[key];
          }
        }
      }
    }

    return defaultValue;
  };

  const schema = yup.object().shape({
    name: yup.string().required('Name is required.'),
  });

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
  console.log('ProductData', ProductData);

  const navigate = useNavigate();
  const onsubmit = (newRecord) => {
    console.log('newRecord', newRecord);
    if (ProducteditData) {
      const editedIndex = ProductData?.findIndex((item) => item.id === ProducteditData.id);
      ProductData?.splice(editedIndex, 1, {
        ...newRecord,
        id: ProducteditData?.id,
      });
      setProductData(ProductData);
      ProductsetEditData(null);

      navigate('/product');
    } else {
      const newId =
        ProductData?.length > 0 ? ProductData[ProductData?.length - 1].id + 1 : 1;
      const payLoad = {
        ...newRecord,
        id: newId,
      };
      console.log('payLoad', payLoad);
      setProductData([...ProductData, payLoad]);
      ProductsetEditData(null);

      navigate('/product');
    }
  };

 

  return (
    <div className="formstart">
      <h4 className="editadd">{ProducteditData ? 'Edit record' : 'Add Record'}</h4>
      <form onSubmit={handleSubmit(onsubmit)}>
        <TextField
          error={errors?.Product_name}
          autoFocus
          margin="dense"
          label="Product Name"
          name="Product_name"
          fullWidth
          {...register('Product_name')}
        />
        {errors?.Product_name && <p style={{ color: 'red' }}>Product Name is required</p>}
        <TextField margin='dense' label="ProductImage" type='file' placeholder='Enter Product Image' fullWidth 
        InputLabelProps={{
          shrink: true,
        }}/>
        <TextField margin='dense' label="Image1" type='file' placeholder='Enter Image 1' fullWidth 
        InputLabelProps={{
          shrink: true,
        }}/>
        <TextField margin='dense' label="Image2" type='file' placeholder='Enter Image 2' fullWidth 
        InputLabelProps={{
          shrink: true,
        }}/>
        <TextField margin='dense' label="Image3" type='file' placeholder='Enter Image 3' fullWidth 
        InputLabelProps={{
          shrink: true,
        }}/>
        <TextField margin="dense" label="Sku" fullWidth {...register('sku')} />
        <TextField margin="dense" label="Price" type="number" fullWidth {...register('price')} />
        <TextField margin="dense" label="Weight" type="number" fullWidth {...register('weight')} />
        <TextField margin="dense" label="Description" fullWidth {...register('description')} />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="Status">Status</InputLabel>
            <Select
              labelId="Status"
              id="demo-Status-select"
              value={status}
              label="Status"
              name="status"
              {...register('status')}
              onChange={handleChangeStatus}
            >
              <MenuItem value={'Active'}>Active</MenuItem>
              <MenuItem value={'Not Active'}>Not Active</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField margin="dense" label="ApprovedBy" fullWidth {...register('approvedBy')} />
        <TextField
          margin="dense"
          label="ApprovedDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          defaultValue={approvedDate}
          InputProps={{
            inputProps: {
              min: '01-01-1999', // Set a minimum date
            },
          }}
        //   onChange={(e) => handleChangeapprovedDate(e)}
          fullWidth
          {...register('approvedDate')}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="Vendor_Id">Vendor Id</InputLabel>
            <Select
              labelId="Vendor_Id"
              id="demo-Vendor_Id-select"
              value={Vendor_Id}
              label="Vendor Id"
              name="Vendor_Id"
              {...register('Vendor_Id')}
              onChange={handleChangeVendorId}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="Category_Id">CategoryId</InputLabel>
            <Select
              labelId="Category_Id"
              id="demo-Category_Id-select"
              value={Category_Id}
              label="Category_Id"
              name="Category_Id"
              {...register('Category_Id')}
              onChange={handleChangeCategoryId}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="SubCategory_Id">SubCategoryId</InputLabel>
            <Select
              labelId="SubCategory_Id"
              id="demo-SubCategory_Id-select"
              value={SubCategory_Id}
              label="SubCategory_Id"
              name="SubCategory_Id"
              {...register('SubCategory_Id')}
              onChange={handleChangeSubCategoryId}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="WareHouseId">WareHouseId</InputLabel>
            <Select
              labelId="WareHouseId"
              id="demo-WareHouseId-select"
              value={WareHouseId}
              label="WareHouseId"
              name="WareHouseId"
              {...register('WareHouseId')}
              onChange={handleChangeWareHouseId}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Grid className="addeditcancelbtn">
          <Button onClick={handleClose} color="primary" className="downbtn cancelbtn">
            Cancel
          </Button>
          <Button color="primary" type="submit" className="downbtn addeditbtn">
            {ProducteditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
