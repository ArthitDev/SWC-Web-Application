import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

interface LineChartProps {
  labels: string[]; // วันที่
  dataPoints: number[]; // จำนวนคลิก
  title: string; // ชื่อกราฟ
  woundLabels: string[]; // ชื่อแผล
}

const LineChart: React.FC<LineChartProps> = ({
  labels,
  dataPoints,
  title,
  woundLabels,
}) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    wound: '',
    date: '',
    clicks: 0,
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // ตรวจสอบหน้าจอขนาดเล็ก

  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'จำนวนการอ่าน',
        data: dataPoints,
        borderColor: 'rgb(255,99,132)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            family: 'Prompt', // กำหนดฟอนต์ Prompt
          },
        },
      },
      tooltip: {
        callbacks: {
          label(context: any) {
            const index = context.dataIndex;
            const woundName = woundLabels[index];
            const date = context.label;
            const clickCount = context.raw;
            return `แผล : ${woundName}, วันที่สร้าง : ${date}, จำนวนการอ่าน : ${clickCount}`;
          },
        },
        titleFont: {
          family: 'Prompt',
        },
        bodyFont: {
          family: 'Prompt',
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x' as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          drag: {
            enabled: true,
          },
          mode: 'x' as const,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'วันที่',
          font: {
            family: 'Prompt',
            size: 14,
          },
        },
        ticks: {
          font: {
            family: 'Prompt',
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'จำนวนการอ่าน',
          font: {
            family: 'Prompt',
            size: 14,
          },
        },
        ticks: {
          font: {
            family: 'Prompt',
            size: 14,
          },
        },
      },
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const element = elements[0];
        const { index } = element; // ดึง index ของข้อมูลที่คลิก
        const woundName = woundLabels[index];
        const date = labels[index];
        const clickCount = dataPoints[index];

        // ตั้งค่า modalData
        setModalData({ wound: woundName, date, clicks: clickCount });
        setOpen(true); // เปิด modal
      }
    },
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        {title}
      </Typography>
      <Box
        sx={{
          width: isSmallScreen ? '400px' : '750px',
          height: isSmallScreen ? '300px' : '450px',
          margin: '0 auto',
        }}
      >
        <Line data={data} options={options} />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>รายละเอียด</DialogTitle>
        <DialogContent>
          <Typography>แผล : {modalData.wound}</Typography>
          <Typography>จำนวนการอ่าน : {modalData.clicks}</Typography>
          <Typography>วันที่สร้าง : {modalData.date}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LineChart;
