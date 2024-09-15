import { Delete, Edit } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ReusableAction from 'components/button/ReusableAction';
import ConfirmDeleteModal from 'components/modal/ConfirmDeleteModal';
import usePagination from 'hooks/usePagination'; // ใช้ custom hook ของ pagination
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  deleteWound,
  getWoundImageUrl,
  getWoundsWithPagination,
} from 'services/woundService';
import COLORS from 'theme/colors';
import { WoundData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import { extractTextAfterImage } from 'utils/extractTextUtils';
import FetchError from 'utils/FetchError';
import ReusePagination from 'utils/ReusePagination';
import WoundArticleLoading from 'utils/WoundArticleLoading';

type WoundCardProps = {
  onEdit: (item: WoundData) => void;
  searchTerm: string;
};

const WoundCard: React.FC<WoundCardProps> = ({ onEdit, searchTerm }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWoundId, setSelectedWoundId] = useState<number | null>(null);

  // ใช้ custom hook สำหรับจัดการ pagination
  const { page, limit, totalPages, setPage, setTotalPages } = usePagination();

  // Query ดึงข้อมูลแผล พร้อมใช้ searchTerm, page, limit
  const {
    data: woundsData,
    isLoading: isFetching,
    error,
    refetch,
  } = useQuery(
    ['wounds', page, limit, searchTerm],
    () => getWoundsWithPagination(page, limit, searchTerm),
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages); // ตั้งค่าจำนวนหน้าทั้งหมดจากข้อมูลที่ดึงมา
      },
    }
  );

  useEffect(() => {
    setPage(1); // เมื่อมีการค้นหาใหม่ จะกลับไปที่หน้า 1
  }, [searchTerm, setPage]);

  const mutation = useMutation(deleteWound, {
    onSuccess: () => {
      // เมื่อข้อมูลถูกลบสำเร็จ
      if (woundsData && woundsData.data.length === 1 && page > 1) {
        setPage(page - 1); // ถ้าหน้านี้เหลือรายการเดียว จะย้อนกลับไปหน้าที่แล้ว
      } else {
        refetch(); // ดึงข้อมูลใหม่
      }
      queryClient.invalidateQueries('wounds');
    },
  });

  const handleOpenModal = (id: number) => {
    setSelectedWoundId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWoundId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedWoundId !== null) {
      toast.promise(mutation.mutateAsync(String(selectedWoundId)), {
        loading: 'กำลังลบรายการ...',
        success: 'ลบรายการเรียบร้อยแล้ว!',
        error: 'เกิดข้อผิดพลาดในการลบรายการ',
      });
      handleCloseModal();
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // เปลี่ยนหน้า pagination
  };

  if (isFetching) return <WoundArticleLoading />;
  if (error) return <FetchError />;
  if (!woundsData || woundsData.data.length === 0) return <DataNotFound />;

  return (
    <Box sx={{ width: 'calc(100% - 30px)', margin: '0 auto' }}>
      {woundsData.data.map((item: WoundData, index: number) => (
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
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
              <Typography>{index + 1 + (page - 1) * limit}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              sx={{ textAlign: 'center', mt: { xs: 1, sm: 0 } }}
            >
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {item.wound_name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ textAlign: 'center', mt: { xs: 1, sm: 0 } }}
            >
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '90%',
                  textAlign: 'center',
                }}
              >
                {extractTextAfterImage(item.wound_content).length > 120
                  ? `${extractTextAfterImage(item.wound_content).substring(
                      0,
                      120
                    )} . . .`
                  : extractTextAfterImage(item.wound_content)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              sx={{ textAlign: 'center', mt: { xs: 1, sm: 0 } }}
            >
              <Box display="flex" justifyContent="center">
                {item.wound_cover ? (
                  <img
                    src={getWoundImageUrl(item.wound_cover)}
                    alt={item.wound_name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      margin: '0 auto',
                    }}
                  />
                ) : (
                  <Typography sx={{ color: COLORS.gray[3] }}>
                    No Image Available
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              sx={{ textAlign: 'center', mt: { xs: 1, sm: 0 } }}
            >
              <Box display="flex" justifyContent="center" gap={1}>
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
        totalPages={totalPages} // ส่งจำนวนหน้าทั้งหมด
        currentPage={page} // ส่งหน้าปัจจุบัน
        onPageChange={handlePageChange} // ฟังก์ชันเปลี่ยนหน้า
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

export default WoundCard;
