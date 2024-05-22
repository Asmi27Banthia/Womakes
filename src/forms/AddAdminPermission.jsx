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
import { useAdminPermission } from 'src/hooks/useAdminPermission';

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

export default function AddAdminPermission({ open, setOpen, onAddData, }) {
const {permissionData,setpermissionData,editData,setEditData}= useAdminPermission()
  
  console.log('editData', editData)
  const handleOpen = () => setOpen(true);
  console.log('AddAdminPermission', AddAdminPermission);
  const [date,setDate]=useState('1999-01-01')
  
  
  const handleClose = () => {
    // setOpen(false);
    navigate("/admin/permission")
    setEditData(null);
    // reset();
  };

  const defaultValue = {
    name:  '',
    age: '',
    role:'',
    joinDate:'',
    email:''

  };

  const generateInitialValues = (props) => {
    if (editData) {
      console.log('editData11111', editData)
      for (const key in defaultValue) {
        if (key in editData && editData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray(editData[key]) && editData[key].length > 0
                ? editData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] = editData[key];
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
    age: yup.string().required('Age is required.'),
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
console.log('permissionData', permissionData)

  const navigate = useNavigate()
    const onsubmit = (newRecord) => {
      console.log('newRecord', newRecord)
      if (editData) {
        const editedIndex = permissionData?.findIndex((item) => item.id === editData.id);
        permissionData?.splice(editedIndex,1, {
          ...newRecord,
          id : editData?.id
        })
        setpermissionData(permissionData)
        setEditData(null);

        navigate('/admin/permission')

        // const updatedData = [...data];
        // updatedData[editedIndex] = { ...newRecord, id: editData.id };
      }  else {
        const newId = permissionData?.length > 0 ? permissionData[permissionData?.length - 1].id + 1 : 1;
        const payLoad = {
          ...newRecord,
          id: newId,
        };
        console.log('payLoad', payLoad)
        setpermissionData([...permissionData, payLoad]);
        setEditData(null);

        navigate('/admin/permission')
      }
  };
  const handleChangeDate=(e)=>{
    console.log(';;;;;;;;;;;;;;;;;',e)
  }
  console.log('errors', errors);
  return (
    <div className='formstart'>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <h4 className='editadd'>{editData ? 'Edit record' : 'Add Record'}</h4>
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
              label="Age"
              type="number" // Restrict to accept only numbers
              fullWidth
              {...register('age')}
              // value={newRecord.age}
              // onChange={(e) => handleInputChange("age", e.target.value)}
            />
            <TextField
              margin="dense"
              label="joinDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              defaultValue={date}
              InputProps={{
                inputProps: {
                  min: '01-01-1999', // Set a minimum date
                },
              }}
              onChange={(e)=>handleChangeDate(e)}
              fullWidth
              {...register('joinDate')}
            />

            <TextField
              margin="dense"
              label="Role"
              fullWidth
              {...register('role')}
              // value={newRecord.role}
              // onChange={(e) => handleInputChange("role", e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email Address"
              fullWidth
              {...register('email')}
              // value={newRecord.email}
              // onChange={(e) => handleInputChange("email", e.target.value)}
            />
          <Grid className='addeditcancelbtn'>
            <Button onClick={handleClose} color="primary" className='downbtn cancelbtn'>
              Cancel
            </Button>
            <Button color="primary" type="submit" className='downbtn addeditbtn'>
              {editData ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </form>
    </div>
  );
}
