import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';

export default function OrderRow({
  selected,
  id,
  user_Id,
  cart_Id,
  baseTotal,
  grandTotal,
  discountAmount,
  discountCode,
  status,
  address_Id,
  paymentStatus,
  deliveryCharge,
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
        <TableCell>{user_Id}</TableCell>
        <TableCell>{cart_Id}</TableCell>
        <TableCell>{baseTotal}</TableCell>
        <TableCell>{grandTotal}</TableCell>
        <TableCell>{discountAmount}</TableCell>
        <TableCell>{discountCode}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{address_Id}</TableCell>
        <TableCell>{paymentStatus}</TableCell>
        <TableCell>{deliveryCharge}</TableCell>

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
