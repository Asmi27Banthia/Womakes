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
import './AddRecords.css'
import {  useNavigate } from 'react-router-dom';
import { useVendor } from 'src/hooks/useVendor';

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

export default function AddVendor({ open, setOpen, onAddData, }) {
const {VendorData,setVendorData, VendoreditData, VendorsetEditData}= useVendor()
  
  console.log(' VendoreditData',  VendoreditData)
  const handleOpen = () => setOpen(true);
  const [date,setDate]=useState('1999-01-01')
  
  
  const handleClose = () => {
    // setOpen(false);
    navigate("/vendor")
    VendorsetEditData(null);
    // reset();
  };

  const defaultValue = {
    name:  '',
    phoneNo:'',
    countryCode:'',
    email:'',
    status:'',
    approvedBy:'Asmi Banthia',
    adminUserId:''

  };

  const generateInitialValues = (props) => {
    if ( VendoreditData) {
      console.log('editData11111',  VendoreditData)
      for (const key in defaultValue) {
        if (key in  VendoreditData &&  VendoreditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray( VendoreditData[key]) &&  VendoreditData[key].length > 0
                ?  VendoreditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] =  VendoreditData[key];
          }
        }
      }
    }

    return defaultValue;
  };

  // useEffect(() => {
  //   if(editData){
  //     reset(generateInitialValues());
  //   }
  // }, [editData]);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required.'),
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    defaultValues: generateInitialValues(),
    mode: 'onsubmit',
    reValidateMode: 'onsubmit',
    // resolver: yupResolver(schema),
  });
console.log('VendorData', VendorData)

  const navigate = useNavigate()
    const onsubmit = (newRecord) => {
      console.log('newRecord', newRecord)
      if ( VendoreditData) {
        const editedIndex = VendorData?.findIndex((item) => item.id ===  VendoreditData.id);
        VendorData?.splice(editedIndex,1, {
          ...newRecord,
          id :  VendoreditData?.id
        })
        setVendorData(VendorData)
        VendorsetEditData(null);

        navigate('/vendor')

        // const updatedData = [...data];
        // updatedData[editedIndex] = { ...newRecord, id: editData.id };
      }  else {
        const newId = VendorData?.length > 0 ? VendorData[VendorData?.length - 1].id + 1 : 1;
        const payLoad = {
          ...newRecord,
          id: newId,
        };
        console.log('payLoad', payLoad)
        setVendorData([...VendorData, payLoad]);
        VendorsetEditData(null);

        navigate('/vendor')
      }
  };
  const handleChangeDate=(e)=>{
    console.log(';;;;;;;;;;;;;;;;;',e)
  }
  console.log('errors', errors);
  return (
    <div className='formstart'>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <h4 className='editadd'>{ VendoreditData ? 'Edit record' : 'Add Record'}</h4>
        <form onSubmit={handleSubmit(onsubmit)}>
        <TextField
              error={errors?.name}
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              {...register('name')}

              // value={newRecord.name}
              // onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {errors?.name && <p style={{ color: 'red' }}>Name is required</p>}
            <TextField
              margin="dense"
              label="Phone Number"
              type="number" // Restrict to accept only numbers
              fullWidth
              {...register('phoneNo')}
              // value={newRecord.age}
              // onChange={(e) => handleInputChange("age", e.target.value)}
            />
             <TextField
              margin="dense"
              label="Country Code"
              type="number" // Restrict to accept only numbers
              fullWidth
              {...register('countryCode')}
              // value={newRecord.age}
              // onChange={(e) => handleInputChange("age", e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              {...register('email')}
              // value={newRecord.role}
              // onChange={(e) => handleInputChange("role", e.target.value)}
            />
           <TextField
              margin="dense"
              label="Status"
              fullWidth
              {...register('status')}
              // value={newRecord.role}
              // onChange={(e) => handleInputChange("role", e.target.value)}
            />
             <TextField
              margin="dense"
              label="ApprovedBy"
              fullWidth
              {...register('approvedBy')}
              // value={newRecord.role}
              // onChange={(e) => handleInputChange("role", e.target.value)}
            />
             <TextField
              margin="dense"
              label="Admin User Id"
              fullWidth
              {...register('adminUserId')}
              // value={newRecord.role}
              // onChange={(e) => handleInputChange("role", e.target.value)}
            />
          <Grid className='addeditcancelbtn'>
            <Button onClick={handleClose} color="primary" className='downbtn cancelbtn'>
              Cancel
            </Button>
            <Button color="primary" type="submit" className='downbtn addeditbtn'>
              { VendoreditData ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </form>
    </div>
  );
}
