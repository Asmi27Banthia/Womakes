// MultiselectoffersisCategory.jsx
import React from 'react';
import { TextField, Autocomplete, Chip } from '@mui/material';

const MultiselectoffersisCategory = ({ options, selectedOptions, setSelectedOptions }) => {
  return (
    <Autocomplete
      multiple
      id="multi-select"
      options={options}
      getOptionLabel={(option) => option.label}
      value={selectedOptions}
      onChange={(event, newValue) => {
        setSelectedOptions(newValue);
        
      }}
     
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option.value}
            label={option.label}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select Category"
          placeholder="Choose..."
        />
      )}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  );
};

export default MultiselectoffersisCategory;
