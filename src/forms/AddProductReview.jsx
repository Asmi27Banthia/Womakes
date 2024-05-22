import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css';
import { useNavigate } from 'react-router-dom';
import { useProductReview } from 'src/hooks/useProductReview';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

export default function AddProductReview({ open, setOpen, onAddData }) {
  const { ProductReviewData, setProductReviewData, ProductRevieweditData, ProductReviewsetEditData } = useProductReview();

  const [Product_Id, setProductId] = React.useState('');
  const [User_Id, setUserId] = React.useState('');
  const [Vendor_Id, setVendorId] = React.useState('');

  const handleChangeProductId = (event) => {
    setProductId(event.target.value);
  };
  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };
  const handleChangeVendorId = (event) => {
    setVendorId(event.target.value);
  };

  useEffect(() => {
    if(ProductRevieweditData) {
      setProductId(Number(ProductRevieweditData?.Product_Id))
    }
  }, [ProductRevieweditData])
  useEffect(() => {
    if(ProductRevieweditData) {
        setUserId((ProductRevieweditData?.User_Id))
    }
  }, [ProductRevieweditData])
  useEffect(() => {
    if(ProductRevieweditData) {
        setVendorId(Number(ProductRevieweditData?.Vendor_Id))
    }
  }, [ProductRevieweditData])
  
  const handleClose = () => {
    navigate('/productreview');
    ProductReviewsetEditData(null);
  };

  const defaultValue = {
    Product_Id: '',
    User_Id: '',
    review:'',
    star:'',
    Vendor_Id: '',
  };

  const generateInitialValues = (props) => {
    if (ProductRevieweditData) {
      for (const key in defaultValue) {
        if (key in ProductRevieweditData && ProductRevieweditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(ProductRevieweditData[key]) && ProductRevieweditData[key].length > 0
                ? ProductRevieweditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = ProductRevieweditData[key];
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
  console.log('ProductReviewData', ProductReviewData);

  const navigate = useNavigate();
  const onsubmit = (newRecord) => {
    console.log('newRecord', newRecord);
    if (ProductRevieweditData) {
      const editedIndex = ProductReviewData?.findIndex((item) => item.id === ProductRevieweditData.id);
      ProductReviewData?.splice(editedIndex, 1, {
        ...newRecord,
        id: ProductRevieweditData?.id,
      });
      setProductReviewData(ProductReviewData);
      ProductReviewsetEditData(null);

      navigate('/productreview');

    } else {
      const newId = ProductReviewData?.length > 0 ? ProductReviewData[ProductReviewData?.length - 1].id + 1 : 1;
      const payLoad = {
        ...newRecord,
        id: newId,
      };
      console.log('payLoad', payLoad);
      setProductReviewData([...ProductReviewData, payLoad]);
      ProductReviewsetEditData(null);

      navigate('/productreview');
    }
  };
  


  return (
    <div className="formstart">
      <h4 className="editadd">{ProductRevieweditData ? 'Edit record' : 'Add Record'}</h4>
      <form onSubmit={handleSubmit(onsubmit)}>
      <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="Product_Id">ProductId</InputLabel>
            <Select
              labelId="Product_Id"
              id="demo-Product_Id-select"
              value={Product_Id}
              label="Product_Id"
              name='Product_Id'
              {...register('Product_Id')}
              onChange={handleChangeProductId}
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
            <InputLabel id="User_Id">UserId</InputLabel>
            <Select
              labelId="User_Id"
              id="demo-User_Id-select"
              value={User_Id}
              label="User_Id"
              name='User_Id'
              {...register('User_Id')}
              onChange={handleChangeUserId}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          autoFocus
          margin="dense"
          label="Review"
          name="review"
          fullWidth
          {...register('review')}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Stars(in 0.5/1 precision)"
          name="star"
          type='number'
          fullWidth
          {...register('star')}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="Vendor_Id">VendorId</InputLabel>
            <Select
              labelId="Vendor_Id"
              id="demo-Vendor_Id-select"
              value={Vendor_Id}
              label="Vendor_Id"
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
        <Grid className="addeditcancelbtn">
          <Button onClick={handleClose} color="primary" className="downbtn cancelbtn">
            Cancel
          </Button>
          <Button color="primary" type="submit" className="downbtn addeditbtn">
            {ProductRevieweditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
