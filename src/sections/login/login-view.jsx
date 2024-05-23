import { useState } from 'react';
import {
  Box, Link, Card, Stack, TextField, Typography,
  IconButton, Grid, Container
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import './login-view.css';
import { useRouter } from 'src/routes/hooks';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/');
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" fullWidth required />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3, cursor: 'pointer' }}
      >
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box className="loginbox">
      <Stack className="loginstack">
        <Container>
          <div className="loginmaindiv">
            <Grid container spacing={0} className="logingridcontainer">
              <Grid item xs={12} md={6} className="logingrid">
                <Card className="loginimage logincard" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Card className="logincard loginform">
                  <Typography variant="h4">Login</Typography>
                  <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                    Don’t have an account?
                    <Link
                      variant="subtitle2"
                      sx={{ ml: 0.5, cursor: 'pointer' }}
                      onClick={() => router.push('/signup')}
                    >
                      Get started
                    </Link>
                  </Typography>
                  {renderForm}
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Stack>
    </Box>
  );
}
