import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SummaryCard from 'src/components/cards/SummaryCard';

import Iconify from 'src/components/iconify';
import { applyFilter, getComparator } from 'src/sections/user/utils';
import AppCurrentVisits from 'src/sections/overview/app-current-visits';
import RevenueReport from 'src/sections/charts/RevenueReport';
import Divider from '@mui/material/Divider';
import { users } from 'src/_mock/user';

// ----------------------------------------------------------------------

export default function ManagerDashboard() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
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

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  const campaigns = [
    {
      title: 'CHANNEL',
      value: 'ROM',
    },
    {
      title: 'Email',
      value: '40%',
    },
    {
      title: 'Website',
      value: '28%',
    },
    {
      title: 'Facebook',
      value: '34%',
    },
    {
      title: 'Offline',
      value: '17%',
    },
  ];
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" color="black">
          Manager Dashboard
        </Typography>
        <Grid style={{ display: 'flex', gap: 20 }}>
          <Button
            variant="contained"
            onClick={() => console.log('object')}
            // color="inherit"
            startIcon={<Iconify icon="uil:calender" />}
          >
            Weekly
          </Button>
          <Button
            variant="contained"
            onClick={() => console.log('object2')}
            // color="inherit"
            startIcon={<Iconify icon="basil:filter-outline" />}
          >
            Select Date
          </Button>
        </Grid>
      </Stack>

      <Grid container spacing={3}>
        <Grid xs={12} md={2} lg={8} container>
          <Grid xs={3} md={2} lg={3}>
            <SummaryCard title="Sales" value={354} bgColor="#FEEFE9" icon="ph:trend-up-bold" />
          </Grid>
          <Grid xs={3} md={3} lg={3}>
            <SummaryCard
              title="Revenue"
              value={`$${'86,954'}`}
              bgColor="#DBFBFE"
              icon="ph:trend-up-bold"
            />
          </Grid>
          <Grid xs={3} md={3} lg={3}>
            <SummaryCard
              title="Conversion"
              value={`${10} %`}
              bgColor="#DCEBFF"
              icon="ph:trend-up-bold"
            />
          </Grid>
          <Grid xs={3} md={3} lg={3}>
            <SummaryCard title="Leads" value={654} bgColor="#E5F7EF" icon="ph:trend-up-bold" />
          </Grid>
          <Grid xs={12} md={6} lg={12}>
            <RevenueReport
              title="Deal Distribution By Stage"
              chart={{
                labels: [
                  '01/01/2023',
                  '02/01/2023',
                  '03/01/2023',
                  '04/01/2023',
                  '05/01/2023',
                  '06/01/2023',
                  '07/01/2023',
                  '08/01/2023',
                  '09/01/2023',
                  '10/01/2023',
                  '11/01/2023',
                ],
                series: [
                  {
                    name: 'Net Profit',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  // {
                  //   name: 'Revenue',
                  //   type: 'column',
                  //   fill: 'solid',
                  //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 100],
                  // },
                  // {
                  //   name: 'Free Cash Flow',
                  //   type: 'column',
                  //   fill: 'gradient',
                  //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  // },
                ],
              }}
            />
          </Grid>
        </Grid>
        <Grid xs={12} md={6} lg={4} direction="space-between">
          <Grid xs={12} md={6} lg={4} container direction="column" mb={5}>
            <Card style={{ padding: 10 }}>
              <Grid display="flex" justifyContent="space-between">
                <Typography variant="h3">Campaigns</Typography>
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  // style={{ border: 'solid', borderColor: '#EfEfEf' }}
                >
                  <Iconify
                    width={30}
                    icon="ph:dots-three-bold"
                    sx={{
                      // color: (theme) => theme.palette.getContrastText(color),
                      transition: (theme) =>
                        theme.transitions.create('all', {
                          duration: theme.transitions.duration.shortest,
                        }),
                    }}
                  />
                </Grid>
              </Grid>
              <Divider style={{ marginBottom: 20 }} />

              {campaigns?.map((item, index) => (
                <>
                  <Grid display="flex" justifyContent="space-between" key={index}>
                    <Typography>{item?.title}</Typography>
                    <Typography>{item?.value}</Typography>
                  </Grid>
                  <Divider />
                </>
              ))}

              {/* <List
                sx={{
                  py: 0,
                  // width: '100%',
                  maxWidth: 360,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                }}
              >
                <ListItem>
                  <ListItemText primary="Full width variant below" />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="Inset variant below" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText primary="Middle variant below" />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                  <ListItemText primary="List item" />
                </ListItem>
              </List> */}
            </Card>
            {/* <AppCurrentVisits
              title="Over View"
              chart={{
                series: [
                  { label: 'America', value: 4344 },
                  { label: 'Asia', value: 5435 },
                  { label: 'Europe', value: 1443 },
                  { label: 'Africa', value: 4443 },
                ],
              }}
            /> */}
          </Grid>
          <Grid xs={12} md={6} lg={4} container direction="column">
            <AppCurrentVisits
              title="Trends Calculation"
              chart={{
                series: [
                  { label: 'America', value: 4344 },
                  { label: 'Asia', value: 5435 },
                  { label: 'Europe', value: 1443 },
                  { label: 'Africa', value: 4443 },
                ],
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
