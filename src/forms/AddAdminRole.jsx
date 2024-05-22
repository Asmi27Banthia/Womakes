import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './AddRecords.css'
import {  useNavigate } from 'react-router-dom';
import { useAdminRole } from 'src/hooks/useAdminRole';

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

export default function AddAdminRole({ open, setOpen, onAddData, }) {
const {AdminRoleData,setAdminRoleData, AdminRoleeditData, AdminRolesetEditData}= useAdminRole()
  const handleClose = () => {
    navigate("/admin/role")
    AdminRolesetEditData(null);
  };

  const defaultValue = {
    Role_name:  '',
  };

  const generateInitialValues = (props) => {
    if ( AdminRoleeditData) {
      console.log('editData11111',  AdminRoleeditData)
      for (const key in defaultValue) {
        if (key in  AdminRoleeditData &&  AdminRoleeditData[key] !== null) {
          if (Array.isArray(defaultValue[key])) {
            defaultValue[key] =
              Array.isArray( AdminRoleeditData[key]) &&  AdminRoleeditData[key].length > 0
                ?  AdminRoleeditData[key]
                : defaultValue[key];
          } else {
            defaultValue[key] =  AdminRoleeditData[key];
          }
        }
      }
    }

    return defaultValue;
  };

  const schema = yup.object().shape({
    Role_name: yup.string().required('Role Name is required.'),
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
console.log('AdminRoleData', AdminRoleData)

  const navigate = useNavigate()
    const onsubmit = (newRecord) => {
      console.log('newRecord', newRecord)
      if ( AdminRoleeditData) {
        const editedIndex = AdminRoleData?.findIndex((item) => item.id ===  AdminRoleeditData.id);
        AdminRoleData?.splice(editedIndex,1, {
          ...newRecord,
          id :  AdminRoleeditData?.id
        })
        setAdminRoleData(AdminRoleData)
        AdminRolesetEditData(null);

        navigate('/admin/role')

      }  else {
        const newId = AdminRoleData?.length > 0 ? AdminRoleData[AdminRoleData?.length - 1].id + 1 : 1;
        const payLoad = {
          ...newRecord,
          id: newId,
        };
        console.log('payLoad', payLoad)
        setAdminRoleData([...AdminRoleData, payLoad]);
        AdminRolesetEditData(null);

        navigate('/admin/role')
      }
  };
  const handleChangeDate=(e)=>{
    console.log(';;;;;;;;;;;;;;;;;',e)
  }
  console.log('errors', errors);
  return (
    <div className='formstart'>
        <h4 className='editadd'>{ AdminRoleeditData ? 'Edit record' : 'Add Record'}</h4>
        <form onSubmit={handleSubmit(onsubmit)}>
        <TextField
              error={errors?.Role_name}
              autoFocus
              margin="dense"
              label="Role Name"
              fullWidth
              {...register('Role_name')}
            />
            {errors?.Role_name && <p style={{ color: 'red' }}>Role Name is required</p>}
          <Grid className='addeditcancelbtn'>
            <Button onClick={handleClose} color="primary" className='downbtn cancelbtn'>
              Cancel
            </Button>
            <Button color="primary" type="submit" className='downbtn addeditbtn'>
              { AdminRoleeditData ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </form>
    </div>
  );
}
