import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material';
import ConfirmDeleteModal from 'components/modal/ConfirmDeleteModal';
import useFormatDate from 'hooks/useFormatDate';
import usePagination from 'hooks/usePagination';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import { DeleteIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  deleteContact,
  getAllContacts,
  updateIsRead,
} from 'services/contactService';
import COLORS from 'themes/colors';
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
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<ContactData | null>(
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

    if (selectedContact?.id === id) {
      setSelectedContact((prev) =>
        prev ? { ...prev, isRead: newStatus } : prev
      );
    }
    // setOpenModal(false);
  };

  const handleOpenModal = (contact: ContactData) => {
    setSelectedContact(contact);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedContact(null);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteContact = (id: number) => {
    deleteContact(id)
      .then(() => {
        queryClient.invalidateQueries('contacts');
        toast.success('ลบข้อความติดต่อแล้ว');
      })
      .catch(() => {
        toast.error('ไม่สามารถลบข้อความติดต่อได้');
      });
  };

  const handleOpenDeleteModal = (contact: ContactData) => {
    setContactToDelete(contact);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      handleDeleteContact(contactToDelete.id);
      setDeleteModalOpen(false);
    }
  };

  if (isFetching) return <WoundArticleLoading />;
  if (error) return <FetchError />;
  if (!contactsData || !contactsData.data || contactsData.data.length === 0) {
    return <DataNotFound />;
  }

  // ฟังก์ชันที่จัดการเมื่อเกิดการ drag and drop
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedContacts = Array.from(contactsData.data);
    const draggedItemIndex = result.source.index;
    const draggedItem = updatedContacts[draggedItemIndex] as ContactData;

    // ลบการ์ดออกจากตำแหน่งเดิม
    updatedContacts.splice(draggedItemIndex, 1);

    // ตรวจสอบว่าถูกย้ายไปที่ไหน (อ่านแล้วหรือยังไม่อ่าน) แล้วอัปเดตสถานะ
    if (result.destination.droppableId === 'read') {
      draggedItem.isRead = 1; // เปลี่ยนเป็นอ่านแล้ว
    } else if (result.destination.droppableId === 'unread') {
      draggedItem.isRead = 0; // เปลี่ยนเป็นยังไม่ได้อ่าน
    }

    // เพิ่มการ์ดในตำแหน่งใหม่ที่ถูกต้อง
    updatedContacts.splice(result.destination.index, 0, draggedItem);

    // อัปเดต isRead ผ่าน API
    mutation.mutate({ id: draggedItem.id, isRead: draggedItem.isRead });

    // อัปเดตข้อมูลใน queryClient เพื่อให้ UI อัปเดต
    queryClient.setQueryData(['contacts', category, page, limit, searchTerm], {
      ...contactsData,
      data: updatedContacts,
    });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Box sx={{ width: '100%', margin: '0 auto', padding: '16px' }}>
        <Grid container spacing={2}>
          {/* ฝั่ง "อ่านแล้ว" */}
          <Droppable droppableId="read">
            {(providedRead) => (
              <Grid
                item
                xs={12}
                md={6}
                ref={providedRead.innerRef}
                {...providedRead.droppableProps}
              >
                <Typography variant="h6" textAlign="center" gutterBottom>
                  <MarkEmailReadIcon sx={{ mr: 1, color: COLORS.green[5] }} />{' '}
                  อ่านแล้ว (
                  {
                    contactsData.data.filter(
                      (item: ContactData) => item.isRead === 1
                    ).length
                  }
                  )
                </Typography>
                <Box sx={{ height: '100%' }}>
                  {contactsData.data
                    .filter((item: ContactData) => item.isRead === 1)
                    .map((item: ContactData) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={contactsData.data.findIndex(
                          (i: { id: number }) => i.id === item.id
                        )}
                      >
                        {(providedDrag, snapshot) => (
                          <Box
                            ref={providedDrag.innerRef}
                            {...providedDrag.draggableProps}
                            {...providedDrag.dragHandleProps}
                            sx={{
                              mb: 2,
                              backgroundColor: snapshot.isDragging
                                ? 'red'
                                : 'green',
                            }}
                          >
                            <Paper
                              elevation={0}
                              sx={{
                                padding: 2,
                                borderRadius: 2,
                                border: `1px solid ${COLORS.gray[2]}`,
                                overflow: 'hidden',
                              }}
                            >
                              <Grid container alignItems="center">
                                <Grid item xs={5}>
                                  <Typography variant="body2">
                                    <strong>ชื่อผู้ติดต่อ :</strong>{' '}
                                    {item.contact_name}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>อีเมล :</strong>{' '}
                                    {item.contact_email}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>หัวข้อ :</strong>{' '}
                                    {item.contact_subject}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>ส่งเมื่อ :</strong>{' '}
                                    {formatDate(item.createdAt)}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>ข้อความ :</strong>{' '}
                                    {item.contact_message.length > 20
                                      ? `${item.contact_message.substring(
                                          0,
                                          20
                                        )}...`
                                      : item.contact_message}
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Box display="flex" justifyContent="flex-end">
                                    <Button
                                      variant="outlined"
                                      onClick={() => handleOpenModal(item)}
                                      sx={{ mr: 1 }}
                                    >
                                      ดูเนื้อหา
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      onClick={() =>
                                        handleOpenDeleteModal(item)
                                      }
                                      sx={{ ml: 1 }}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  {providedRead.placeholder}
                </Box>
              </Grid>
            )}
          </Droppable>

          {/* ฝั่ง "ยังไม่ได้อ่าน" */}
          <Droppable droppableId="unread">
            {(providedUnread) => (
              <Grid
                item
                xs={12}
                md={6}
                ref={providedUnread.innerRef}
                {...providedUnread.droppableProps}
              >
                <Typography variant="h6" textAlign="center" gutterBottom>
                  <MarkEmailUnreadIcon sx={{ color: COLORS.red[4] }} />{' '}
                  ยังไม่ได้อ่าน (
                  {
                    contactsData.data.filter(
                      (item: ContactData) => item.isRead === 0
                    ).length
                  }
                  )
                </Typography>
                <Box sx={{ height: '100%' }}>
                  {contactsData.data
                    .filter((item: ContactData) => item.isRead === 0)
                    .map((item: ContactData) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={contactsData.data.findIndex(
                          (i: { id: number }) => i.id === item.id
                        )}
                      >
                        {(providedDrag, snapshot) => (
                          <Box
                            ref={providedDrag.innerRef}
                            {...providedDrag.draggableProps}
                            {...providedDrag.dragHandleProps}
                            sx={{
                              mb: 2,
                              backgroundColor: snapshot.isDragging
                                ? 'green'
                                : 'red',
                            }}
                          >
                            <Paper
                              elevation={0}
                              sx={{
                                padding: 2,
                                borderRadius: 2,
                                border: `1px solid ${COLORS.gray[2]}`,
                                overflow: 'hidden',
                              }}
                            >
                              <Grid container alignItems="center">
                                <Grid item xs={5}>
                                  <Typography variant="body2">
                                    <strong>ชื่อผู้ติดต่อ :</strong>{' '}
                                    {item.contact_name}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>อีเมล :</strong>{' '}
                                    {item.contact_email}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>หัวข้อ :</strong>{' '}
                                    {item.contact_subject}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>ส่งเมื่อ :</strong>{' '}
                                    {formatDate(item.createdAt)}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>ข้อความ :</strong>{' '}
                                    {item.contact_message.length > 20
                                      ? `${item.contact_message.substring(
                                          0,
                                          20
                                        )}...`
                                      : item.contact_message}
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Box display="flex" justifyContent="flex-end">
                                    <Button
                                      variant="outlined"
                                      onClick={() => handleOpenModal(item)}
                                      sx={{ mr: 1 }}
                                    >
                                      ดูเนื้อหา
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      onClick={() =>
                                        handleOpenDeleteModal(item)
                                      }
                                      sx={{ ml: 1 }}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  {providedUnread.placeholder}
                </Box>
              </Grid>
            )}
          </Droppable>
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
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
              width: '90%',
              maxWidth: { xs: '90%', sm: '80%', md: '60%', lg: '40%' },
              overflowY: 'auto',
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
            >
              รายละเอียดการติดต่อ
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              <strong>สถานะ :</strong>{' '}
              {selectedContact?.isRead === 0 ? (
                <>
                  ยังไม่ได้อ่าน
                  <MarkEmailUnreadIcon sx={{ color: 'red', ml: 1 }} />
                </>
              ) : (
                <>
                  อ่านแล้ว
                  <MarkEmailReadIcon sx={{ color: 'green', ml: 1 }} />
                </>
              )}
              <br />
              <strong>ชื่อผู้ติดต่อ :</strong> {selectedContact?.contact_name}
              <br />
              <strong>อีเมล :</strong> {selectedContact?.contact_email}
              <br />
              <strong>ประเภทการติดต่อ :</strong>{' '}
              {selectedContact?.contact_subject}
              <br />
              <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <strong>ข้อความ :</strong> {selectedContact?.contact_message}
              </Box>
            </Typography>
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button
                onClick={() =>
                  handleToggleRead(
                    selectedContact?.id!,
                    selectedContact?.isRead!
                  )
                }
                sx={{
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
                    เปลี่ยนสถานะ
                  </>
                ) : (
                  <>
                    <CheckCircleIcon sx={{ mr: 1 }} />
                    เปลี่ยนสถานะ
                  </>
                )}
              </Button>
              <Button
                onClick={handleCloseModal}
                sx={{
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

        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="ยืนยันการลบ"
          description="คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?"
          confirmText="ลบ"
          cancelText="ยกเลิก"
        />
      </Box>
    </DragDropContext>
  );
};

export default ContactCard;
