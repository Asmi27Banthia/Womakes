import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/sections/account/table-no-data';
import UserTableToolbar from 'src/sections/user/user-table-toolbar';
import UserTableHead from 'src/sections/user/user-table-head';
import UserTableRow from '../../src/pages/VendorRow';
import TableEmptyRows from 'src/sections/account/table-empty-rows';
import { applyFilter, emptyRows, getComparator } from 'src/sections/user/utils';
import AddRecords from 'src/forms/AddVendor';
import { useNavigate } from 'react-router-dom';
import { useVendor } from 'src/hooks/useVendor';


const Vendor = () => {
  const {VendorData,setVendorData,VendorsetEditData}= useVendor()

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); 
  // const [VendorData, setVendorData] = useState(VendorData);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
console.log('VendorData', VendorData)

  
  const handleEditOpen = (row) => {
    console.log('row', row)
    console.log('VendorsetEditData', VendorsetEditData)
    VendorsetEditData(row);
    navigate("/addVendor")
  };

  const handleSort = (event, id) => {
    console.log('id', id)
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = VendorData?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDelete = (id) => {
    const updatedData = VendorData.filter((item) => item.id !== id);
    const updatedDataWithSequentialIds = updatedData?.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setVendorData(updatedDataWithSequentialIds);
  };

  const dataFiltered = applyFilter({
    inputData: VendorData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const notFound = !dataFiltered.length && !!filterName;
  // addAdminPermission
  const navigate = useNavigate()
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Vendor</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/addVendor')}
        >
          Add Record
        </Button>
      </Stack>

      <Card 
        sx={
          {
            boxShadow:" 0px 4px 7px 0px rgba(148,145,145,0.75)",
          }
        }
      >
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          tableData={dataFiltered} 
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={VendorData.length} 
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'Id' },
                  { id: 'name', label: 'Name' },
                  { id: 'phoneNo',label:'Phone No.'},
                  { id: 'countryCode',label:'Country Code'},
                  { id: 'email',label:'Email'},
                  { id: 'status',label:'Status'},
                  { id: 'approvedBy',label:'ApprovedBy'},
                  { id: 'adminUserId',label:'Admin User Id'},
                  { id: '', label: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => (
                  <UserTableRow
                    key={row.id}
                    {...row}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                    onEdit={() => handleEditOpen(row)}
                    onDelete={() => handleDelete(row.id)} 
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, VendorData.length)} 
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={VendorData.length} 
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
   

    </Container>
  );
};

export default Vendor;
