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
import UserTableRow from '../../src/pages/ProductStockRow';
import TableEmptyRows from 'src/sections/account/table-empty-rows';
import { applyFilter, emptyRows, getComparator } from 'src/sections/user/utils';
import { useNavigate } from 'react-router-dom';
import { useProductStock } from 'src/hooks/useProductStock';


const ProductStock = () => {
  const {ProductStockData,setProductStockData,ProductStocksetEditData}= useProductStock()

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); 
  // const [ProductStockData, setProductStockData] = useState(ProductStockData);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
console.log('ProductStockData', ProductStockData)

  
  const handleEditOpen = (row) => {
    console.log('row', row)
    console.log('ProductStocksetEditData', ProductStocksetEditData)
    ProductStocksetEditData(row);
    navigate("/addProductStock")
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
      const newSelecteds = ProductStockData?.map((n) => n.id);
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
    const updatedData = ProductStockData.filter((item) => item.id !== id);
    const updatedDataWithSequentialIds = updatedData?.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setProductStockData(updatedDataWithSequentialIds);
  };

  const dataFiltered = applyFilter({
    inputData: ProductStockData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const notFound = !dataFiltered.length && !!filterName;
 
  const navigate = useNavigate()
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Product Stock</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/addProductStock')}
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
                rowCount={ProductStockData.length} 
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'Id' },
                  { id: 'Product_Id',label:'Product Id'},
                  { id: 'quantity', label: 'Quantity' },
                  { id: 'WareHouseId',label:'WareHouse Id'},
                  { id: '', label: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => (
                  <UserTableRow
                    key={row.id}
                    {...row}
                    selected={selected.indexOf(row?.id) !== -1}
                    handleClick={(event) => handleClick(event, row?.id)}
                    onEdit={() => handleEditOpen(row)}
                    onDelete={() => handleDelete(row.id)} 
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, ProductStockData.length)} 
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={ProductStockData.length} 
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default ProductStock;
