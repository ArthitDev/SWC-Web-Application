import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material';
import useFormatDate from 'hooks/useFormatDate';
import usePagination from 'hooks/usePagination';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAllContacts, updateIsRead } from 'services/contactService';
import COLORS from 'theme/colors';
import { ContactData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import FetchError from 'utils/FetchError';
import ReusePagination from 'utils/ReusePagination';
import WoundArticleLoading from 'utils/WoundArticleLoading';

type ContactCardProps = {
  searchTerm: string;
  category: string;
};

const ContactCard: React.FC<ContactCardProps> = ({ searchTerm, category }) => {
  const queryClient = useQueryClient();
  const { formatDate } = useFormatDate();
  const { page, limit, totalPages, setPage, setTotalPages } = usePagination(
    1,
    10
  );
  const [openModal, setOpenModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(
    null
  );

  const {
    data: contactsData,
    isLoading: isFetching,
    error,
  } = useQuery(
    ['contacts', category, page, limit, searchTerm],
    () => getAllContacts(category, searchTerm, page, limit),
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages);
      },
    }
  );

  useRefetchWebSocket('contacts', 'UPDATE_CONTACTS');

  // ตั้งค่า page เป็นหน้าแรกเมื่อ searchTerm เปลี่ยน
  useEffect(() => {
    setPage(1);
  }, [searchTerm, setPage]);

  const mutation = useMutation(
    ({ id, isRead }: { id: number; isRead: number }) =>
      updateIsRead(id, isRead),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contacts');
      },
    }
  );

  const handleToggleRead = (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 0 ? 1 : 0;
    mutation.mutate({ id, isRead: newStatus });

    // อัปเดต selectedContact ถ้ามีการเปิด Modal อยู่
    if (selectedContact?.id === id) {
      setSelectedContact((prev) =>
        prev ? { ...prev, isRead: newStatus } : prev
      );
    }
  };

  const handleOpenModal = (contact: ContactData) => {
    setSelectedContact(contact);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedContact(null);
  };

  if (isFetching) return <WoundArticleLoading />;
  if (error) return <FetchError />;

  if (!contactsData || !contactsData.data || contactsData.data.length === 0) {
    return <DataNotFound />;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const readContactsCount = contactsData.data.filter(
    (item: ContactData) => item.isRead === 1
  ).length;
  const unreadContactsCount = contactsData.data.filter(
    (item: ContactData) => item.isRead === 0
  ).length;

  return (
    <>
      <Box sx={{ width: 'calc(100% - 30px)', margin: '0 auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" textAlign="center" gutterBottom>
              อ่านแล้ว ( {readContactsCount} )
            </Typography>
            {contactsData.data
              .filter((item: ContactData) => item.isRead === 1)
              .map((item: ContactData) => (
                <Grid
                  key={item.id}
                  item
                  xs={12}
                  sm={8}
                  sx={{ margin: '0 auto' }}
                >
                  <Paper
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
                      <Grid item xs={12} sm={10}>
                        <Typography variant="body2">
                          <strong>ชื่อผู้ติดต่อ :</strong> {item.contact_name}
                        </Typography>
                        <Typography variant="body2">
                          <strong>อีเมล :</strong> {item.contact_email}
                        </Typography>
                        <Typography variant="body2">
                          <strong>หัวข้อ :</strong> {item.contact_subject}
                        </Typography>
                        <Typography variant="body2">
                          <strong>ส่งเมื่อ :</strong>{' '}
                          {formatDate(item.createdAt)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>ข้อความ :</strong> {item.contact_message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenModal(item)}
                        >
                          ดูเนื้อหา
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6" textAlign="center" gutterBottom>
              ยังไม่ได้อ่าน ( {unreadContactsCount} )
            </Typography>
            {contactsData.data
              .filter((item: ContactData) => item.isRead === 0)
              .map((item: ContactData) => (
                <Grid
                  key={item.id}
                  item
                  xs={12}
                  sm={8}
                  sx={{ margin: '0 auto' }}
                >
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
                      <Grid item xs={12} sm={10}>
                        <Typography variant="body2">
                          <strong>ชื่อผู้ติดต่อ :</strong> {item.contact_name}
                        </Typography>
                        <Typography variant="body2">
                          <strong>อีเมล :</strong> {item.contact_email}
                        </Typography>
                        <Typography variant="body2">
                          <strong>หัวข้อ :</strong> {item.contact_subject}
                        </Typography>
                        <Typography variant="body2">
                          <strong>ส่งเมื่อ :</strong>{' '}
                          {formatDate(item.createdAt)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>ข้อความ :</strong> {item.contact_message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenModal(item)}
                        >
                          ดูเนื้อหา
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Grid>

        <ReusePagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              textAlign={'center'}
            >
              รายละเอียดการติดต่อ
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              <strong>ชื่อผู้ติดต่อ :</strong> {selectedContact?.contact_name}
              <br />
              <strong>อีเมล :</strong> {selectedContact?.contact_email}
              <br />
              <strong>ประเภทการติดต่อ :</strong>{' '}
              {selectedContact?.contact_subject}
              <br />
              <strong>ข้อความ :</strong> {selectedContact?.contact_message}
              <br />
              <strong>สถานะ :</strong>{' '}
              {selectedContact?.isRead === 0 ? 'ยังไม่ได้อ่าน' : 'อ่านแล้ว'}
            </Typography>
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Button
                onClick={() =>
                  handleToggleRead(
                    selectedContact?.id!,
                    selectedContact?.isRead!
                  )
                }
                sx={{
                  mt: 2,
                  bgcolor:
                    selectedContact?.isRead === 0
                      ? COLORS.gray[3]
                      : COLORS.green[5],
                  color: 'white',
                  '&:hover': {
                    bgcolor:
                      selectedContact?.isRead === 0
                        ? COLORS.gray[3]
                        : COLORS.green[5],
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selectedContact?.isRead === 0 ? (
                  <>
                    <RadioButtonUncheckedIcon sx={{ mr: 1 }} />
                    ยังไม่ได้อ่าน
                  </>
                ) : (
                  <>
                    <CheckCircleIcon sx={{ mr: 1 }} />
                    อ่านแล้ว
                  </>
                )}
              </Button>
              <Button
                onClick={handleCloseModal}
                sx={{
                  mt: 2,
                  bgcolor: 'error.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'error.dark' },
                  ml: 2,
                }}
              >
                ปิด
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default ContactCard;
