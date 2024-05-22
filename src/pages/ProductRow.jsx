import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';

export default function ProductRow({
  selected,
  id,
  Product_name,
  url,
  sku,
  price,
  weight,
  description,
  status,
  approvedBy,
  approvedDate,
  Vendor_Id,
  Category_Id,
  SubCategory_Id,
  WareHouseId,
  handleClick,
  onEdit,
  onDelete, 
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{id}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Typography variant="subtitle2" noWrap>
            {Product_name}
          </Typography>
        </TableCell>
        <TableCell>
          <img src={url}  alt='abc'/>
        </TableCell>
        <TableCell>{sku}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{weight}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{approvedBy}</TableCell>
        <TableCell>{approvedDate}</TableCell>
        <TableCell>{Vendor_Id}</TableCell>
        <TableCell>{Category_Id}</TableCell>
        <TableCell>{SubCategory_Id}</TableCell>
        {/* <TableCell><img src={url} alt="Girl in a jacket" width="500" height="600"/></TableCell> */}
        <TableCell>{WareHouseId}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => { onEdit(); handleCloseMenu(); }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => { onDelete(); handleCloseMenu(); }} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
