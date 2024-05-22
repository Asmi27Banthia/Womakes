import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions  from '@mui/material/DialogActions ';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css';
import { useNavigate } from 'react-router-dom';
import { useCategory } from 'src/hooks/useCategory';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

export default function AddCategory({ open, setOpen, onAddData }) {
  const { CategoryData, setCategoryData, CategoryeditData, CategorysetEditData } = useCategory();

  console.log(' CategoryeditData', CategoryeditData);

  const [status, setStatus] = React.useState('');
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const [WareHouseId, setWareHouseId] = React.useState('');
  console.log('WareHouseId', WareHouseId)
  const [ParentId, setParentId] = React.useState('');
  const handleChangeParentId = (event) => {
    setParentId(event.target.value);
  };
  const handleClose = () => {
    navigate('/category');
    CategorysetEditData(null);
  };

  const defaultValue = {
    Category_name: '',
    status: '',
    createdBy: 'Asmi Banthia',
    WareHouseId: '',
    ParentId: '',
  };

  const generateInitialValues = (props) => {
    if (CategoryeditData) {
      for (const key in defaultValue) {
        if (key in CategoryeditData && CategoryeditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(CategoryeditData[key]) && CategoryeditData[key].length > 0
                ? CategoryeditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = CategoryeditData[key];
          }
        }
      }
    }

    return defaultValue;
  };

  const schema = yup.object().shape({
    Category_name: yup.string().required('Category Name is required.'),
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
  console.log('CategoryData', CategoryData);

  const navigate = useNavigate();
  const onsubmit = (newRecord) => {
    console.log('newRecord', newRecord);
    if (CategoryeditData) {
      const editedIndex = CategoryData?.findIndex((item) => item.id === CategoryeditData.id);
      CategoryData?.splice(editedIndex, 1, {
        ...newRecord,
        id: CategoryeditData?.id,
      });
      setCategoryData(CategoryData);
      CategorysetEditData(null);

      navigate('/category');

      // const updatedData = [...data];
      // updatedData[editedIndex] = { ...newRecord, id: editData.id };
    } else {
      const newId = CategoryData?.length > 0 ? CategoryData[CategoryData?.length - 1].id + 1 : 1;
      const payLoad = {
        ...newRecord,
        id: newId,
      };
      console.log('payLoad', payLoad);
      setCategoryData([...CategoryData, payLoad]);
      CategorysetEditData(null);

      navigate('/category');
    }
  };
  
  useEffect(() => {
    if(CategoryeditData) {
      setWareHouseId(Number(CategoryeditData?.WareHouseId))
    }
  }, [CategoryeditData])
  useEffect(() => {
    if(CategoryeditData) {
      setStatus((CategoryeditData?.status))
    }
  }, [CategoryeditData])
  useEffect(() => {
    if(CategoryeditData) {
      setParentId(Number(CategoryeditData?.ParentId))
    }
  }, [CategoryeditData])
  
  
  const handleChangeWareHouseId = (event) => {
    console.log('event', event)
    setWareHouseId(event.target.value);
  };
  const [option, setOption] = useState([{ label: '1', value: 1 },{ label: '2', value: 2 },{ label: '3', value: 3 },{ label: '4', value: 4 },{ label: '5', value: 5 }]);
  const [option1, setOption1] = useState([{ label: 'Active', value: 'Active' },{ label: 'Not Active', value: 'Not Active'}]);
  return (
    <div className="formstart">
      <h4 className="editadd">{CategoryeditData ? 'Edit record' : 'Add Record'}</h4>
      <form onSubmit={handleSubmit(onsubmit)}>
      <MainTextField label={'Category Name'} name={'Category_name'} register={register} error={errors?.Category_name}/>
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
        <MainTextField label={'CreatedBy'} name={'createdBy'} register={register} />
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
              id="demo-ParentId-select"
              value={ParentId}
              label="ParentId"
              name="ParentId"
              register={register}
              onChange={handleChangeParentId}
              option={option}
              mainname="ParentId"
            />}
        </Box>
        <Grid className="addeditcancelbtn">
          <Button onClick={handleClose} color="primary" className="downbtn cancelbtn">
            Cancel
          </Button>
          <Button color="primary" type="submit" className="downbtn addeditbtn">
            {CategoryeditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
