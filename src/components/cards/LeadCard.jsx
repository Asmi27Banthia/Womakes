import * as React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Iconify from '../iconify';

export default function LeadCard() {
  return (
    <Grid xs={12} md={4} lg={4} item>
      <Card sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Grid
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: '#F1F5F9', color: 'black' }} aria-label="recipe">
              R
            </Avatar>
            <Typography variant="h6">Jhon Doe</Typography>
          </Grid>
          <Button color="inherit">
            <Iconify icon="ph:dots-three-vertical-bold" />
          </Button>
        </Grid>

        <Grid>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </Grid>
      </Card>
    </Grid>
  );
}
