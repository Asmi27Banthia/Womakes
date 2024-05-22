import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { RouterLink } from 'src/routes/components';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      <Logo />
    </Box>
  );

  return (
    <>
      {/* {renderHeader} */}
        <div className='nopage'>
 
          <Grid container spacing={1}>
            <Grid item xs={6}>
              
          <Box
            component="img"
            src="/assets/background/404page.jpg"
            sx={{
              width:'100%'
              
           
            }}
          />
            </Grid>
        
          <Grid item xs={6} className='nopagegridtwo'>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Sorry, we couldn’t find the page you are looking for!
          </Typography>
            
          <Button href="/" size="large" variant="contained" component={RouterLink} className='nopagebutton'>
            Go to HomePage
          </Button>
          </Grid>
          </Grid>
         
          {/* <Typography sx={{ color: 'text.secondary' }}>
            
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography> */}

</div>
      
     
    </>
  );
}
