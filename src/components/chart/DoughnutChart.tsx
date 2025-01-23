import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

// ลงทะเบียน Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  dataValues: number[];
  title: string;
  dates?: string[]; // เพิ่มข้อมูลวันที่เป็น optional props
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  labels,
  dataValues,
  title,
  dates = [], // กำหนดค่าเริ่มต้นเป็น array ว่างหากไม่มีข้อมูลวันที่
}) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    label: '',
    value: 0,
    date: '',
  });

  const handlePointClick = (element: any) => {
    if (element.length > 0) {
      const { index } = element[0];
      const label = labels[index];
      const value = dataValues[index];
      const date = dates[index] || 'ไม่ทราบวันที่';
      setModalData({ label, value, date });
      setOpen(true); // เปิด modal เมื่อคลิก
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'จำนวนการอ่าน ',
        data: dataValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#1ABC9C',
          '#34495E',
          '#F39C12',
          '#2ECC71',
          '#9B59B6',
          '#E74C3C',
          '#2980B9',
          '#8E44AD',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#1ABC9C',
          '#34495E',
          '#F39C12',
          '#2ECC71',
          '#9B59B6',
          '#E74C3C',
          '#2980B9',
          '#8E44AD',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: 'start' as 'start',
        labels: {
          boxWidth: 20,
          padding: 10,
          font: {
            family: 'Prompt',
            size: 14,
          },
        },
      },
      tooltip: {
        titleFont: {
          family: 'Prompt',
        },
        bodyFont: {
          family: 'Prompt',
        },
      },
    },
    onClick: (event: any, elements: any[]) => {
      handlePointClick(elements);
    },
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: '400px', height: '400px', margin: '0 auto' }}>
        <Doughnut data={data} options={options} />
      </Box>

      {/* Modal สำหรับแสดงข้อมูล */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>รายละเอียด</DialogTitle>
        <DialogContent>
          <Typography>บทความ : {modalData.label}</Typography>
          <Typography>จำนวนการอ่าน : {modalData.value}</Typography>
          <Typography>วันที่สร้าง : {modalData.date}</Typography>{' '}
          {/* แสดงวันที่ */}
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

export default DoughnutChart;
