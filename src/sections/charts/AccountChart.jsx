import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AccountChart({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options } = chart;
  console.log('series', series);
  console.log('colors', colors);

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '56%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    // xaxis: {
    //   type: 'time',
    // },
    // dataLabels: {
    //   enabled: true,
    // },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other} style={{ minHeight: 490 }}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AccountChart.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
