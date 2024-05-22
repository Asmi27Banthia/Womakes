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
import UserTableRow from '../../src/pages/SubCategoryRow';
import TableEmptyRows from 'src/sections/account/table-empty-rows';
import { applyFilter, emptyRows, getComparator } from 'src/sections/user/utils';
import AddRecords from 'src/forms/AddSubCategory';
import { useNavigate } from 'react-router-dom';
import { useSubCategory } from 'src/hooks/useSubCategory';


const SubCategory = () => {
  const {SubCategoryData,setSubCategoryData,SubCategorysetEditData}= useSubCategory()

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); 
  // const [SubCategoryData, setSubCategoryData] = useState(SubCategoryData);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
console.log('SubCategoryData', SubCategoryData)

  
  const handleEditOpen = (row) => {
    console.log('row', row)
    console.log('SubCategorysetEditData', SubCategorysetEditData)
    SubCategorysetEditData(row);
    navigate("/addSubCategory")
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
      const newSelecteds = SubCategoryData?.map((n) => n.name);
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
    const updatedData = SubCategoryData.filter((item) => item.id !== id);
    const updatedDataWithSequentialIds = updatedData?.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setSubCategoryData(updatedDataWithSequentialIds);
  };

  const dataFiltered = applyFilter({
    inputData: SubCategoryData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const notFound = !dataFiltered.length && !!filterName;
  // addAdminPermission
  const navigate = useNavigate()
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Sub Category</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/addSubCategory')}
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
                rowCount={SubCategoryData.length} 
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'Id' },
                  { id: 'name', label: 'Name' },
                  { id: 'Category_Id',label:'Category Id'},
                  { id: 'WareHouseId',label:'WareHouse Id'},
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
                  emptyRows={emptyRows(page, rowsPerPage, SubCategoryData.length)} 
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={SubCategoryData.length} 
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default SubCategory;
