import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
const Maindropdown = ({ id, mainname,onChange, label, register, value, name, option }) => {
    console.log('option', option)
    const [menuItemValue,setMenuItemValue]=useState()
    useEffect(()=>{
        if(option){
            setMenuItemValue(option)
        }
    },[option])
  return (
      <FormControl fullWidth className='dropcss'>
        <InputLabel id={label}>{mainname}</InputLabel>
        <Select
          labelId={label}
          id={id}
          value={value}
          label={mainname}
          name={name}
          {...register(name)}
          onChange={onChange}
        >
          {menuItemValue &&
            menuItemValue.map((x, index) => (
              <MenuItem value={x.value} key={index}>
                {x.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
  );
};

export default Maindropdown;
