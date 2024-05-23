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
import UserTableRow from '../../src/pages/AdminPermissionRow';
import TableEmptyRows from 'src/sections/account/table-empty-rows';
import { applyFilter, emptyRows, getComparator } from 'src/sections/user/utils';
import AddRecords from 'src/forms/AddAdminPermission';
import { useNavigate } from 'react-router-dom';
import { useAdminPermission } from 'src/hooks/useAdminPermission';


const AdminPermission = () => {
  const {permissionData,setpermissionData,setEditData}= useAdminPermission()

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); 
  // const [permissionData, setpermissionData] = useState(permissionData);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
console.log('permissionData', permissionData)
  // const handleAddRecord = (newRecord) => {
  //   if (editData) {
  //     const editedIndex = permissionData.findIndex((item) => item.id === editData.id);
  //     const updatedData = [...permissionData];
  //     updatedData[editedIndex] = { ...newRecord, id: editData.id };
  //     setpermissionData(updatedData);
  //     setEditData(null);
  //     setOpen(false);
  //   } else {
  //     const newId = permissionData.length > 0 ? permissionData[permissionData.length - 1].id + 1 : 1;
  //     const payLoad = {
  //       ...newRecord,
  //       id: newId,
  //     };
  //     setpermissionData([...permissionData, payLoad]);
  //     setOpen(false);
  //   }
  // };
  
  const handleEditOpen = (row) => {
    console.log('row', row)
    console.log('setEditData', setEditData)
    setEditData(row);
    
    // setOpen(true);
    navigate("/addAdminPermission")
  };

  // const handleEditClose = () => {
  //   setEditOpen(false);
  //   setEditData(null);
  // };

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
      const newSelecteds = permissionData?.map((n) => n.name);
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
    const updatedData = permissionData.filter((item) => item.id !== id);
    const updatedDataWithSequentialIds = updatedData?.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setpermissionData(updatedDataWithSequentialIds);
  };

  

  const dataFiltered = applyFilter({
    inputData: permissionData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const notFound = !dataFiltered.length && !!filterName;
  // addAdminPermission
  const navigate = useNavigate()
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Admin Permission</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/addAdminPermission')}
        >
          Add Record
        </Button>
      </Stack>

      <Card 
        sx={
          {
            // border:"1px solid black",
            boxShadow:" 0px 4px 7px 0px rgba(148,145,145,0.75)",
          // webkitBoxShadow:" 0px 4px 7px 0px rgba(148,145,145,0.75)",
          //   mozBoxShadow: "0px 4px 7px 0px rgba(148,145,145,0.75)",
        
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
                rowCount={permissionData.length} 
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'Id' },
                  { id: 'name', label: 'Name' },
                  { id: 'path', label: 'Path' },
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
                  emptyRows={emptyRows(page, rowsPerPage, permissionData.length)} 
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={permissionData.length} 
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
   

    </Container>
  );
};

export default AdminPermission;
