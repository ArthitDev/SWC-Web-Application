import { Delete, Edit } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ReusableAction from 'components/button/ReusableAction';
import ConfirmDeleteModal from 'components/modal/ConfirmDeleteModal';
import usePagination from 'hooks/usePagination';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTricksWithPagination } from 'services/trickService';
import { deleteWound } from 'services/woundService';
import COLORS from 'theme/colors';
import { TrickData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import FetchError from 'utils/FetchError';
import ReusePagination from 'utils/ReusePagination';
import TrickDidLoading from 'utils/TrickDidLoading';

type TrickCardProps = {
  onEdit: (item: TrickData) => void;
  searchTerm: string;
};

const TrickCard: React.FC<TrickCardProps> = ({ onEdit, searchTerm }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrickId, setSelectedTrickId] = useState<number | null>(null);

  // ใช้ custom hook สำหรับ pagination
  const { page, limit, totalPages, setPage, setTotalPages } = usePagination();

  const {
    data: tricksData,
    isLoading: isFetching,
    error,
    refetch,
  } = useQuery(
    ['tricks', page, limit, searchTerm],
    () => getTricksWithPagination(page, limit, searchTerm),
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages); // อัพเดทจำนวนหน้าทั้งหมดเมื่อดึงข้อมูลสำเร็จ
      },
    }
  );

  useEffect(() => {
    setPage(1); // เมื่อมีการค้นหาใหม่ จะกลับไปที่หน้า 1
  }, [searchTerm, setPage]);

  const mutation = useMutation(deleteWound, {
    onSuccess: () => {
      if (tricksData && tricksData.data.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        refetch();
      }
      queryClient.invalidateQueries('tricks');
    },
  });

  if (isFetching)
    return (
      <Box pt={0}>
        <TrickDidLoading />
      </Box>
    );
  if (error) return <FetchError />;

  if (!tricksData || !tricksData.data || tricksData.data.length === 0) {
    return <DataNotFound />;
  }

  const handleOpenModal = (id: number) => {
    setSelectedTrickId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrickId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedTrickId !== null) {
      toast.promise(mutation.mutateAsync(String(selectedTrickId)), {
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
      {tricksData.data.map((item: TrickData, index: number) => (
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
                {item.trick_name}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <Box display="flex" justifyContent="center" gap={0.5}>
                <ReusableAction
                  icon={<Edit />}
                  backgroundColor="#D89030" // สีส้ม
                  onClick={() => onEdit(item)}
                />
                <ReusableAction
                  icon={<Delete />}
                  backgroundColor="#FF3B30" // สีแดง
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

export default TrickCard;
