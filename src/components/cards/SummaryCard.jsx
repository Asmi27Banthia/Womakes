import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Iconify from '../iconify';

// ----------------------------------------------------------------------

export default function SummaryCard({ title, value, icon, bgColor, sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={4}
      direction="column"
      //   style={{ height: `calc(60vh - 132px)` }}
      sx={{
        px: 3,
        py: 4,
        borderRadius: 2,
        backgroundColor: bgColor,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h3">{value}</Typography>
      <div style={{ display: 'flex', gap: 5, flexDirection: 'row' }}>
        <div style={{ marginTop: 4 }}>
          <Iconify
            icon={icon}
            sx={{
              color: '#247EF2',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ color: '#247EF2' }}>
            25.67%
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            354
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            Week
          </Typography>
        </div>
      </div>
      {/* {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>} */}

      {/* <Stack spacing={0.5}>
        <Typography variant="h4">{fShortenNumber(value)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack> */}
    </Card>
  );
}

SummaryCard.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
  value: PropTypes.number,
};
