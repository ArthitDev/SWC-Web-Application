import { Delete, Edit } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ReusableAction from 'components/button/ReusableAction';
import ConfirmDeleteModal from 'components/modal/ConfirmDeleteModal';
import usePagination from 'hooks/usePagination';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  deleteDidyouknow,
  getDidyouknowWithPagination,
} from 'services/didyouknowService';
import COLORS from 'themes/colors';
import { DidyouknowData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import FetchError from 'utils/FetchError';
import ReusePagination from 'utils/ReusePagination';
import TrickDidLoading from 'utils/TrickDidLoading';

type DidyouknowCardProps = {
  onEdit: (item: DidyouknowData) => void;
  searchTerm: string;
};

const DidyouknowCard: React.FC<DidyouknowCardProps> = ({
  onEdit,
  searchTerm,
}) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ใช้ custom hook สำหรับ pagination
  const { page, limit, totalPages, setPage, setTotalPages } = usePagination();

  const [selectedDidyouknowId, setSelectedDidyouknowId] = useState<
    number | null
  >(null);
  const {
    data: didyouknowData,
    isLoading: isFetching,
    error,
    refetch,
  } = useQuery(
    ['didyouknows', page, limit, searchTerm],
    () => getDidyouknowWithPagination(page, limit, searchTerm),
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages); // อัพเดทจำนวนหน้าทั้งหมดเมื่อดึงข้อมูลสำเร็จ
      },
    }
  );

  useEffect(() => {
    setPage(1); // เมื่อมีการค้นหาใหม่ จะกลับไปที่หน้า 1
  }, [searchTerm, setPage]);

  const mutation = useMutation(deleteDidyouknow, {
    onSuccess: () => {
      if (didyouknowData && didyouknowData.data.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        refetch();
      }
      queryClient.invalidateQueries('didyouknows');
    },
  });

  if (isFetching)
    return (
      <Box pt={0}>
        <TrickDidLoading />
      </Box>
    );
  if (error) return <FetchError />;

  if (
    !didyouknowData ||
    !didyouknowData.data ||
    didyouknowData.data.length === 0
  ) {
    return <DataNotFound />;
  }

  const handleOpenModal = (id: number) => {
    setSelectedDidyouknowId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDidyouknowId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedDidyouknowId !== null) {
      toast.promise(mutation.mutateAsync(selectedDidyouknowId), {
        loading: 'กำลังลบรายการ...',
        success: 'รายการถูกลบเรียบร้อยแล้ว!',
        error: 'เกิดข้อผิดพลาดในการลบรายการ',
      });
      handleCloseModal();
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: 'calc(100% - 30px)', margin: '0 auto' }}>
      {didyouknowData.data.map((item: DidyouknowData, index: number) => (
        <Paper
          key={item.id}
          elevation={0}
          sx={{
            mb: 2,
            borderRadius: 2,
            border: `1px solid ${COLORS.gray[2]}`,
            overflow: 'hidden',
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{
              p: 2,
            }}
          >
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <Typography>{index + 1 + (page - 1) * limit}</Typography>
            </Grid>
            <Grid item xs={7} sx={{ textAlign: 'justify' }}>
              <Typography
                sx={{
                  whiteSpace: 'wrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '90%',
                }}
              >
                {item.didyouknow_name}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <Box display="flex" justifyContent="center" gap={0.5}>
                <ReusableAction
                  icon={<Edit />}
                  backgroundColor="#D89030"
                  onClick={() => onEdit(item)}
                />
                <ReusableAction
                  icon={<Delete />}
                  backgroundColor="#FF3B30"
                  onClick={() => handleOpenModal(item.id)}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <ReusePagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="ยืนยันการลบ"
        description="คุณแน่ใจว่าต้องการลบรายการนี้หรือไม่?"
        confirmText="ยืนยันการลบ"
        cancelText="ยกเลิก"
      />
    </Box>
  );
};

export default DidyouknowCard;
