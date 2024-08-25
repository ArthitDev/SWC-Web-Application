import { Delete, Edit } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ReusableAction from 'components/button/ReusableAction';
import ConfirmDeleteModal from 'components/modal/ConfirmDeleteModal';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteArticle, getAllArticle } from 'services/articleService';
import COLORS from 'theme/colors';
import { ArticleData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import FetchError from 'utils/FetchError';
import WoundArticleLoading from 'utils/WoundArticleLoading';

type ArticleCardProps = {
  onEdit: (item: ArticleData) => void;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  );

  const {
    data,
    isLoading: isFetching,
    error,
  } = useQuery('article', getAllArticle);

  const mutation = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('article');
    },
  });

  if (isFetching) return <WoundArticleLoading />;
  if (error) return <FetchError />;

  if (!Array.isArray(data)) {
    return <DataNotFound />;
  }

  const handleOpenModal = (id: number) => {
    setSelectedArticleId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticleId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedArticleId !== null) {
      toast.promise(mutation.mutateAsync(String(selectedArticleId)), {
        loading: 'กำลังลบรายการ...',
        success: 'รายการถูกลบเรียบร้อยแล้ว!',
        error: 'เกิดข้อผิดพลาดในการลบรายการ',
      });
      handleCloseModal();
    }
  };

  return (
    <Box sx={{ width: 'calc(100% - 30px)', margin: '0 auto' }}>
      {data.map((item: ArticleData, index: number) => (
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
                {item.article_name}
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
                {item.article_content.length > 120
                  ? `${item.article_content.substring(0, 120)} . . .`
                  : item.article_content}
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
                  src={`https://drive.google.com/thumbnail?id=${item.article_cover}`}
                  alt="Article Cover"
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

export default ArticleCard;
