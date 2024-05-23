import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Correct import

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ numSelected, filterName, onFilterName, tableData }) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'users.xlsx');
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'pink.main',
          bgcolor: 'pink.main',
        }),
        color: 'pink.main',
          bgcolor: '#313B4E',
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          sx={{color: '#ffffff'}}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: '#ffffff', width: 20, height: 20 }}
              />
            </InputAdornment>
            
          }
        />
      )}

      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Filter list">
              <IconButton>
                <Iconify icon="ic:round-filter-list" sx={{color:'#ffffff'}}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Export">
              <IconButton onClick={handleExport}>
                <Iconify icon="eva:download-outline"  sx={{color:'#ffffff'}}/>
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  tableData: PropTypes.array.isRequired,
};
