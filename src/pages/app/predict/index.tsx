import HowToUseModal from 'components/app/predict/HowToUseModal';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import CustomModal from '@/components/modal/CustomModal';

const DynamicPredictPage = dynamic(
  () => import('components/app/predict/PredictPage')
);

const PredictPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedPredictPage');
    if (!hasVisited) {
      setOpenModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setOpenConfirmModal(true);
  };

  const handleConfirmCloseModal = () => {
    localStorage.setItem('hasVisitedPredictPage', 'true');
    setOpenModal(false);
    setOpenConfirmModal(false);
  };

  const handleCancelCloseModal = () => {
    setOpenConfirmModal(false);
  };

  return (
    <>
      <DynamicPredictPage />
      <HowToUseModal open={openModal} onClose={handleCloseModal} />
      <CustomModal
        isOpen={openConfirmModal}
        onClose={handleCancelCloseModal}
        onConfirm={handleConfirmCloseModal}
        title="ยืนยันการปิด"
        description="คุณแน่ใจหรือไม่ว่าต้องการปิดคำแนะนำการใช้งานนี้?"
        confirmText="ยืนยัน"
        cancelText="ยกเลิก"
      />
    </>
  );
};

export default PredictPage;
