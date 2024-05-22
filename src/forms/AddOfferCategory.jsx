import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css';
import { useNavigate } from 'react-router-dom';
import { useOfferCategory } from 'src/hooks/useOfferCategory';
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

export default function AddOfferCategory({ open, setOpen, onAddData }) {
  const { OfferCategoryData, setOfferCategoryData, OfferCategoryeditData, OfferCategorysetEditData } = useOfferCategory();

  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);
  const [Offer_Id, setOfferId] = React.useState('');
  const [Category_Id, setCategoryId] = React.useState('');
  const [SubCategory_Id, setSubCategoryId] = React.useState('');
  const handleChangeOfferId = (event) => {
    setOfferId(event.target.value);
  };
  const handleChangeCategoryId = (event) => {
    setCategoryId(event.target.value);
  };
  const handleChangeSubCategoryId = (event) => {
    setSubCategoryId(event.target.value);
  };
  useEffect(() => {
    if(OfferCategoryeditData) {
      setOfferId(Number(OfferCategoryeditData?.Offer_Id))
    }
  }, [OfferCategoryeditData])
  useEffect(() => {
    if(OfferCategoryeditData) {
      setCategoryId(Number(OfferCategoryeditData?.Category_Id))
    }
  }, [OfferCategoryeditData])
  useEffect(() => {
    if(OfferCategoryeditData) {
      setSubCategoryId(Number(OfferCategoryeditData?.SubCategory_Id))
    }
  }, [OfferCategoryeditData])
 
  const handleClose = () => {
    navigate('/offercategory');
    OfferCategorysetEditData(null);
  };

  const defaultValue = {
    Offer_Id:'',
    Category_Id: '',
    SubCategory_Id: '',
  };

  const generateInitialValues = (props) => {
    if (OfferCategoryeditData) {
      for (const key in defaultValue) {
        if (key in OfferCategoryeditData && OfferCategoryeditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(OfferCategoryeditData[key]) && OfferCategoryeditData[key].length > 0
                ? OfferCategoryeditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = OfferCategoryeditData[key];
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

  const navigate = useNavigate();
  const onsubmit = (newRecord) => {
    console.log('newRecord', newRecord);
    if (OfferCategoryeditData) {
      const editedIndex = OfferCategoryData?.findIndex((item) => item.id === OfferCategoryeditData.id);
      OfferCategoryData?.splice(editedIndex, 1, {
        ...newRecord,
        id: OfferCategoryeditData?.id,
      });
      setOfferCategoryData(OfferCategoryData);
      OfferCategorysetEditData(null);

      navigate('/offercategory');

    } else {
      const newId = OfferCategoryData?.length > 0 ? OfferCategoryData[OfferCategoryData?.length - 1].id + 1 : 1;
      const payLoad = {
        ...newRecord,
        id: newId,
      };
      console.log('payLoad', payLoad);
      setOfferCategoryData([...OfferCategoryData, payLoad]);
      OfferCategorysetEditData(null);

      navigate('/offercategory');
    }
  };
  

  return (
    <div className="formstart">
      <h4 className="editadd">{OfferCategoryeditData ? 'Edit record' : 'Add Record'}</h4>
      <form onSubmit={handleSubmit(onsubmit)}>
      
      <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-OfferId-select"
              value={Offer_Id}
              label="OfferId"
              name="Offer_Id"
              register={register}
              onChange={handleChangeOfferId}
              option={option}
              mainname="OfferId"
            />}
        </Box>
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-CategoryId-select"
              value={Category_Id}
              label="CategoryId"
              name="Category_Id"
              register={register}
              onChange={handleChangeCategoryId}
              option={option}
              mainname="CategoryId"
            />}
        </Box>
        <Box sx={{ minWidth: 120 }}>
           {option && <Maindropdown
              id="demo-SubCategoryId-select"
              value={SubCategory_Id}
              label="SubCategoryId"
              name="SubCategory_Id"
              register={register}
              onChange={handleChangeSubCategoryId}
              option={option}
              mainname="SubCategoryId"
            />}
        </Box>
        <Grid className="addeditcancelbtn">
          <Button onClick={handleClose} color="primary" className="downbtn cancelbtn">
            Cancel
          </Button>
          <Button color="primary" type="submit" className="downbtn addeditbtn">
            {OfferCategoryeditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
