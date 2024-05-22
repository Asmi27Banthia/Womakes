import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MultiSelectComponent from './MultiselectoffersisCategory';
import { useOffers } from 'src/hooks/useOffers';
import './AddRecords.css';

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

export default function AddOffers({ open, setOpen, onAddData }) {
  const { OffersData, setOffersData, OfferseditData, OfferssetEditData } = useOffers();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [type, setType] = useState('Percentage');
  const [WareHouseId, setWareHouseId] = useState('');
  const [ParentId, setParentId] = useState('');
  const navigate = useNavigate();

  const options = [
    { label: 'Sweet', value: 1 },
    { label: 'Savoury', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
  ];

  useEffect(() => {
    if (OfferseditData) {
      setType(OfferseditData?.type);
      setWareHouseId(Number(OfferseditData?.WareHouseId));
      setParentId(Number(OfferseditData?.ParentId));
      setSelectedOptions(OfferseditData?.isCategory || []);
    }
  }, [OfferseditData]);

  const defaultValue = {
    name: '',
    type: '',
    percentage: '',
    amount: '',
    maxAmount: '',
    code: '',
    startDate: '',
    endDate: '',
    isCategory: [],
    createdBy: 'Asmi Banthia',
  };

  const generateInitialValues = (props) => {
    const initialValues = { ...defaultValue };
    if (OfferseditData) {
      for (const key in defaultValue) {
        if (key in OfferseditData && OfferseditData[key] !== null) {
          initialValues[key] = OfferseditData[key];
        }
      }
    }
    return initialValues;
  };

  const { handleSubmit, formState: { errors }, register, setValue } = useForm({
    defaultValues: generateInitialValues(),
    mode: 'onsubmit',
    reValidateMode: 'onsubmit',
  });

  const onSubmit = (newRecord) => {
    const updatedRecord = { ...newRecord, isCategory: selectedOptions };

    if (OfferseditData) {
      const editedIndex = OffersData.findIndex((item) => item.id === OfferseditData.id);
      OffersData.splice(editedIndex, 1, { ...updatedRecord, id: OfferseditData.id });
      setOffersData([...OffersData]);
      OfferssetEditData(null);
    } else {
      const newId = OffersData.length > 0 ? OffersData[OffersData.length - 1].id + 1 : 1;
      const payLoad = { ...updatedRecord, id: newId };
      setOffersData([...OffersData, payLoad]);
      OfferssetEditData(null);
    }

    navigate('/offers');
  };

  const handleClose = () => {
    navigate('/offers');
    OfferssetEditData(null);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
    setValue('type', event.target.value);
  };

  return (
    <div className="formstart">
      <h4 className="editadd">{OfferseditData ? 'Edit record' : 'Add Record'}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={errors.name}
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        
        <Box sx={{ minWidth: 120 }} className="dropcss">
          <FormControl fullWidth>
            <InputLabel id="type-label">Type (Percentage/Amount)</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              value={type}
              label="Type (Percentage/Amount)"
              name="type"
              onChange={handleChangeType}
            >
              <MenuItem value="Percentage">Percentage</MenuItem>
              <MenuItem value="Amount">Amount</MenuItem>
            </Select>
          </FormControl>
          
          {type === 'Percentage' ? (
            <TextField
              fullWidth
              type="number"
              label="Percentage"
              placeholder="Enter percentage"
              variant="outlined"
              className="dropcss"
              {...register('percentage')}
              inputProps={{ min: 0, max: 100 }}
            />
          ) : (
            <TextField
              fullWidth
              type="number"
              label="Amount"
              placeholder="Enter amount"
              variant="outlined"
              className="dropcss"
              {...register('amount')}
            />
          )}
        </Box>
        
        <TextField
          fullWidth
          type="number"
          label="MaxAmount"
          variant="outlined"
          className="dropcss"
          {...register('maxAmount')}
        />
        
        <TextField
          margin="dense"
          label="Code"
          name="code"
          fullWidth
          {...register('code')}
        />
        
        <TextField
          margin="dense"
          type="date"
          label="StartDate"
          name="startDate"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          {...register('startDate')}
        />
        
        <TextField
          margin="dense"
          type="date"
          label="EndDate"
          name="endDate"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          {...register('endDate')}
        />
        
        <Box sx={{ width: '100%', margin: '0 auto' }}>
          <MultiSelectComponent
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </Box>
        
        <TextField
          margin="dense"
          label="CreatedBy"
          name="createdBy"
          fullWidth
          {...register('createdBy')}
        />
        
        <Grid className="addeditcancelbtn">
          <Button onClick={handleClose} color="primary" className="downbtn cancelbtn">
            Cancel
          </Button>
          <Button color="primary" type="submit" className="downbtn addeditbtn">
            {OfferseditData ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </form>
    </div>
  );
}
