import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css'
import {  useNavigate } from 'react-router-dom';
import { useAdminUser } from 'src/hooks/useAdminUser';

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

export default function AddAdminUser({ open, setOpen, onAddData, }) {
const {AdminUserData,setAdminUserData, AdminUsereditData, AdminUsersetEditData}= useAdminUser()
  
  console.log(' AdminUsereditData',  AdminUsereditData)
  
  const handleClose = () => {
    navigate("/admin/user")
    AdminUsersetEditData(null);
  };

  const defaultValue = {
    name:  '',
    role:'',
    email:''

  };

  const generateInitialValues = (props) => {
    if ( AdminUsereditData) {
      console.log('editData11111',  AdminUsereditData)
      for (const key in defaultValue) {
        if (key in  AdminUsereditData &&  AdminUsereditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray( AdminUsereditData[key]) &&  AdminUsereditData[key].length > 0
                ?  AdminUsereditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] =  AdminUsereditData[key];
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
  } = useForm({
    defaultValues: generateInitialValues(),
    mode: 'onsubmit',
    reValidateMode: 'onsubmit',
  });
console.log('AdminUserData', AdminUserData)

  const navigate = useNavigate()
    const onsubmit = (newRecord) => {
      console.log('newRecord', newRecord)
      if ( AdminUsereditData) {
        const editedIndex = AdminUserData?.findIndex((item) => item.id ===  AdminUsereditData.id);
        AdminUserData?.splice(editedIndex,1, {
          ...newRecord,
          id :  AdminUsereditData?.id
        })
        setAdminUserData(AdminUserData)
        AdminUsersetEditData(null);

        navigate('/admin/user')
      }  else {
        const newId = AdminUserData?.length > 0 ? AdminUserData[AdminUserData?.length - 1].id + 1 : 1;
        const payLoad = {
          ...newRecord,
          id: newId,
        };
        console.log('payLoad', payLoad)
        setAdminUserData([...AdminUserData, payLoad]);
        AdminUsersetEditData(null);

        navigate('/admin/user')
      }
  };
  const handleChangeDate=(e)=>{
    console.log(';;;;;;;;;;;;;;;;;',e)
  }
  console.log('errors', errors);
  return (
    <div className='formstart'>
        <h4 className='editadd'>{ AdminUsereditData ? 'Edit record' : 'Add Record'}</h4>
        <form onSubmit={handleSubmit(onsubmit)}>
        <TextField
              error={errors?.name}
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              {...register('name')}
            />
            {errors?.name && <p style={{ color: 'red' }}>Name is required</p>}
          
            <TextField
              margin="dense"
              label="Role"
              fullWidth
              {...register('role')}
            />
            <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
            <TextField
              margin="dense"
              label="Email Address"
              fullWidth
              {...register('email')}
            />
          <Grid className='addeditcancelbtn'>
            <Button onClick={handleClose} color="primary" className='downbtn cancelbtn'>
              Cancel
            </Button>
            <Button color="primary" type="submit" className='downbtn addeditbtn'>
              { AdminUsereditData ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </form>
    </div>
  );
}
