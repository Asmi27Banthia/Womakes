import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)({
  marginTop: '2rem',
  marginBottom: '2rem',
  padding: '1rem',
  boxShadow: '0px 0px 93px -25px rgba(0,0,0,0.75)',
  borderRadius: '8px',
});

const StyledTableContainer = styled(TableContainer)({
  marginTop: '1rem',
  marginBottom: '1rem',
});

const StyledTabPanel = styled(Box)({
  marginTop: '1rem',
});

const ViewUser = () => {
  const location = useLocation();
  const { state } = location;
  const row = state?.row;
  const userOrders = state?.userOrders;
  console.log(state,'userOrders')
  const userPayment = state?.userPayment;
  

  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    console.log('userOrders:', userOrders);
  }, [userOrders]);
  useEffect(() => {
    console.log('userPayment:', userPayment);
  }, [userPayment]);

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom align="center">
        User Details
      </Typography>
      {row ? (
        <Paper>
          <Tabs value={tabValue} onChange={handleChangeTab} variant="fullWidth">
            <Tab label="User Details" />
            <Tab label="Card Details" />
            <Tab label="Order Details" />
            <Tab label="Payment Details" />
          </Tabs>
          <StyledTabPanel>
            {tabValue === 0 && (
              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>{row.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone No</TableCell>
                      <TableCell>{row.phoneNo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Country Code</TableCell>
                      <TableCell>{row.countryCode}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address ID</TableCell>
                      <TableCell>{row.address_Id}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </StyledTableContainer>
            )}
            {tabValue === 1 && (
              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Card Number</TableCell>
                      <TableCell>{row.cardNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Card Type</TableCell>
                      <TableCell>{row.cardType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Exp Date</TableCell>
                      <TableCell>{row.expDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Card Holder Name</TableCell>
                      <TableCell>{row.cardHolderName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>User ID</TableCell>
                      <TableCell>{row.user_Id}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </StyledTableContainer>
            )}
            {tabValue === 2 && (
              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userOrders && userOrders.length > 0 ? (
                      userOrders?.map((order) => (
                        <React.Fragment key={order.id}>
                          <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>{order.user_Id}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Cart ID</TableCell>
                            <TableCell>{order.cart_Id}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Base Total(₹)</TableCell>
                            <TableCell>{order.baseTotal}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Grand Total(₹)</TableCell>
                            <TableCell>{order.grandTotal}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Discount Amount(₹)</TableCell>
                            <TableCell>{order.discountAmount}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Discount Code</TableCell>
                            <TableCell>{order.discountCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>{order.status}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Address ID</TableCell>
                            <TableCell>{order.address_Id}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>{order.paymentStatus}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Delivery Charge(₹)</TableCell>
                            <TableCell>{order.deliveryCharge}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2}></TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            )}
            {tabValue === 3 && (
              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userPayment && userPayment.length > 0 ? (
                      userPayment?.map((pay) => (
                        <React.Fragment key={pay.id}>
                          <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>{pay.status}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>PaymentReferenceId</TableCell>
                            <TableCell>{pay.paymentReference_Id}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Amount(₹)</TableCell>
                            <TableCell>{pay.amount}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>OrderId</TableCell>
                            <TableCell>{pay.order_Id}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>UserId</TableCell>
                            <TableCell>{pay.user_Id}</TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            )}
          </StyledTabPanel>
        </Paper>
      ) : (
        <Typography>No user data found</Typography>
      )}
    </StyledContainer>
  );
};

export default ViewUser;
