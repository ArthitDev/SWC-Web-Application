import { Delete, Edit } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ReusableAction from 'components/button/ReusableAction';
import ConfirmDeleteModal from 'components/modal/ConfirmDeleteModal';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteWound, getAllWounds } from 'services/woundService';
import COLORS from 'theme/colors';
import { WoundData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import FetchError from 'utils/FetchError';
import WoundArticleLoading from 'utils/WoundArticleLoading';

type WoundCardProps = {
  onEdit: (item: WoundData) => void;
};

const WoundCard: React.FC<WoundCardProps> = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWoundId, setSelectedWoundId] = useState<number | null>(null);

  const {
    data,
    isLoading: isFetching,
    error,
  } = useQuery('wound', getAllWounds);

  const mutation = useMutation(deleteWound, {
    onSuccess: () => {
      queryClient.invalidateQueries('wound');
    },
  });

  if (isFetching) return <WoundArticleLoading />;
  if (error) return <FetchError />;

  if (!Array.isArray(data)) {
    return <DataNotFound />;
  }

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
        success: 'รายการถูกลบเรียบร้อยแล้ว!',
        error: 'เกิดข้อผิดพลาดในการลบรายการ',
      });
      handleCloseModal();
    }
  };

  return (
    <Box sx={{ width: 'calc(100% - 30px)', margin: '0 auto' }}>
      {data.map((item: WoundData, index: number) => (
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
              <Typography>{index + 1}</Typography>
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
                  textAlign: 'center',
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
                {item.wound_content.length > 120
                  ? `${item.wound_content.substring(0, 120)} . . .`
                  : item.wound_content}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              sx={{ textAlign: 'center', mt: { xs: 1, sm: 0 } }}
            >
              <Box display="flex" justifyContent="center">
                <img
                  src={`https://drive.google.com/thumbnail?id=${item.wound_cover}`}
                  alt="Wound Cover"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    margin: '0 auto',
                  }}
                />
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
