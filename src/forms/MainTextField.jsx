import React from 'react'
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';

const MainTextField = ({name,label,register,disabled,error,type}) => {
 console.log('errorzxcvbn',error)
 const inputLabelProps = type === 'date' ? { shrink: true } : {};

  return (
    <div>
      <TextField margin="dense" fullWidth type={type} label={label} disabled={disabled} {...register(name)} 
      className='dropcss' 
      InputLabelProps={inputLabelProps}
      
      />
      {error && <p style={{ color: 'red' }}>{error.message}</p>
    
}    </div>
  )
}

export default MainTextField
