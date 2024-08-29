import { Delete, Edit } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ReusableAction from 'components/button/ReusableAction';
import ConfirmDeleteModal from 'components/modal/ConfirmDeleteModal';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteDidyouknow, getAllDidyouknow } from 'services/didyouknowService';
import COLORS from 'theme/colors';
import { DidyouknowData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import FetchError from 'utils/FetchError';
import TrickDidLoading from 'utils/TrickDidLoading';

type DidyouknowCardProps = {
  onEdit: (item: DidyouknowData) => void;
};

const DidyouknowCard: React.FC<DidyouknowCardProps> = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDidyouknowId, setSelectedDidyouknowId] = useState<
    number | null
  >(null);
  const {
    data,
    isLoading: isFetching,
    error,
  } = useQuery('didyouknow', getAllDidyouknow);

  const mutation = useMutation(deleteDidyouknow, {
    onSuccess: () => {
      queryClient.invalidateQueries('didyouknow');
    },
  });

  if (isFetching)
    return (
      <Box pt={0}>
        <TrickDidLoading />
      </Box>
    );
  if (error) return <FetchError />;

  if (!Array.isArray(data)) {
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

  return (
    <Box sx={{ width: 'calc(100% - 30px)', margin: '0 auto' }}>
      {data.map((item: DidyouknowData, index: number) => (
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
              <Typography>{index + 1}</Typography>
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
