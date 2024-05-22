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
import { useSubCategory } from 'src/hooks/useSubCategory';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Maindropdown from './Maindropdown'
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

export default function AddSubCategory({ open, setOpen, onAddData }) {
  const { SubCategoryData, setSubCategoryData, SubCategoryeditData, SubCategorysetEditData } =
    useSubCategory();

  console.log(' SubCategoryeditData', SubCategoryeditData);

  const [Category_Id, setCategory_Id] = React.useState('');
  const handleChangeCategoryId = (event) => {
    setCategory_Id(event.target.value);
  };
  const [WareHouseId, setWareHouseId] = React.useState('');

  console.log('WareHouseId', WareHouseId);

  const handleClose = () => {
    navigate('/subcategory');
    SubCategorysetEditData(null);
  };

  const defaultValue = {
    name: '',
    Category_Id: '',
    WareHouseId: '',
  };

  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);

  const generateInitialValues = (props) => {
    if (SubCategoryeditData) {
      for (const key in defaultValue) {
        if (key in SubCategoryeditData && SubCategoryeditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(SubCategoryeditData[key]) && SubCategoryeditData[key].length > 0
                ? SubCategoryeditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = SubCategoryeditData[key];
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
  console.log('SubCategoryData', SubCategoryData);

  const navigate = useNavigate();
  const onsubmit = (newRecord) => {
    console.log('newRecord', newRecord);
    if (SubCategoryeditData) {
      const editedIndex = SubCategoryData?.findIndex((item) => item.id === SubCategoryeditData.id);
      SubCategoryData?.splice(editedIndex, 1, {
        ...newRecord,
        id: SubCategoryeditData?.id,
      });
      setSubCategoryData(SubCategoryData);
      SubCategorysetEditData(null);

      navigate('/subcategory');

    } else {
      const newId =
        SubCategoryData?.length > 0 ? SubCategoryData[SubCategoryData?.length - 1].id + 1 : 1;
      const payLoad = {
        ...newRecord,
        id: newId,
      };
      console.log('payLoad', payLoad);
      setSubCategoryData([...SubCategoryData, payLoad]);
      SubCategorysetEditData(null);

      navigate('/subcategory');
    }
  };

  useEffect(() => {
    if (SubCategoryeditData) {
      setWareHouseId(Number(SubCategoryeditData?.WareHouseId));
    }
  }, [SubCategoryeditData]);
  useEffect(() => {
    if (SubCategoryeditData) {
      setCategory_Id(Number(SubCategoryeditData?.Category_Id));
    }
  }, [SubCategoryeditData]);

  const handleChangeWareHouseId = (event) => {
    console.log('event', event);
    setWareHouseId(event.target.value);
  };

  return (
    <div className="formstart">
      <h4 className="editadd">{SubCategoryeditData ? 'Edit record' : 'Add Record'}</h4>
      <form onSubmit={handleSubmit(onsubmit)}>
       
        <MainTextField label={"Name"} name={"name"} error={errors?.name} register={register}/>
      
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
        <Grid className="addeditcancelbtn">
          <Button onClick={handleClose} color="primary" className="downbtn cancelbtn">
            Cancel
          </Button>
          <Button color="primary" type="submit" className="downbtn addeditbtn">
            {SubCategoryeditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
