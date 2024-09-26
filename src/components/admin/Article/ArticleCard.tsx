import { Delete, Edit } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ReusableAction from 'components/button/ReusableAction';
import ConfirmDeleteModal from 'components/modal/ConfirmDeleteModal';
import usePagination from 'hooks/usePagination';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  deleteArticle,
  getArticleImageUrl,
  getArticlesWithPagination,
} from 'services/articleService';
import COLORS from 'themes/colors';
import { ArticleData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import { extractTextAfterImage } from 'utils/extractTextUtils';
import FetchError from 'utils/FetchError';
import ReusePagination from 'utils/ReusePagination';
import WoundArticleLoading from 'utils/WoundArticleLoading';

type ArticleCardProps = {
  onEdit: (item: ArticleData) => void;
  searchTerm: string;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ onEdit, searchTerm }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  );

  // ใช้ custom hook สำหรับ pagination
  const { page, limit, totalPages, setPage, setTotalPages } = usePagination();
  const [selectedCategory] = useState<string>('');

  const {
    data: articlesData,
    isLoading: isFetching,
    error,
    refetch,
  } = useQuery(
    ['articles', selectedCategory, page, limit, searchTerm], // เพิ่ม searchTerm ใน dependency array
    () => getArticlesWithPagination(selectedCategory, searchTerm, page, limit), // ส่ง searchTerm ไปยังฟังก์ชัน service
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages);
      },
    }
  );

  useEffect(() => {
    setPage(1); // เมื่อมีการค้นหาใหม่ จะกลับไปที่หน้า 1
  }, [searchTerm, setPage]);

  const mutation = useMutation(deleteArticle, {
    onSuccess: () => {
      if (articlesData && articlesData.data.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        refetch();
      }
      queryClient.invalidateQueries('articles');
    },
  });

  if (isFetching) return <WoundArticleLoading />;
  if (error) return <FetchError />;

  if (!articlesData || !articlesData.data || articlesData.data.length === 0) {
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: 'calc(100% - 30px)', margin: '0 auto' }}>
      {articlesData.data.map((item: ArticleData, index: number) => (
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
                {extractTextAfterImage(item.article_content).length > 120
                  ? `${extractTextAfterImage(item.article_content).substring(
                      0,
                      120
                    )} . . .`
                  : extractTextAfterImage(item.article_content)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              sx={{ textAlign: 'center', mt: { xs: 1, sm: 0 } }}
            >
              <Box display="flex" justifyContent="center">
                {item.article_cover ? (
                  <img
                    src={getArticleImageUrl(item.article_cover)}
                    alt="Article Cover"
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

export default ArticleCard;
