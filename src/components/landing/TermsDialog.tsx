import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { FaFolderOpen } from 'react-icons/fa6';
import { IoMdCamera } from 'react-icons/io';
import { MdCheck } from 'react-icons/md';
import COLORS from 'themes/colors';

interface TermsDialogProps {
  open: boolean;
  onClose: () => void;
}

const TermsDialog: React.FC<TermsDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '12px',
          padding: '16px',
          maxWidth: '400px',
          width: '100%',
        },
      }}
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image
            width={512}
            height={512}
            priority={true}
            src="/images/documentCheck.webp"
            alt="Landing Logo"
            style={{
              width: '100%',
              maxWidth: '50px',
              height: 'auto',
            }}
          />
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 2, fontWeight: 'bold' }}
          >
            เงื่อนไขการใช้งานแอป SWC
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1, color: 'text.secondary' }}
          >
            โปรดอ่านเงื่อนไขการใช้งานอย่างละเอียดก่อนใช้แอป
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', mb: 1, textIndent: '20px' }}
          >
            1. การให้บริการของแอป
          </Typography>
          <Typography variant="body2">
            แอปนี้ให้ข้อมูลเกี่ยวกับบาดแผลประเภทต่างๆ
            และบริการวิเคราะห์บาดแผลผ่านรูปแผล
            โดยไม่จำเป็นต้องลงทะเบียนหรือล็อกอิน
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', mb: 1, textIndent: '20px' }}
          >
            2. การอัปโหลดรูปแผล
          </Typography>
          <Typography variant="body2">
            ผู้ใช้สามารถอัปโหลดรูปแผลบาดแผลเพื่อรับการวิเคราะห์และคำแนะนำ
            โปรดทราบว่าการวิเคราะห์นี้ไม่ใช่การวินิจฉัยทางการแพทย์และไม่สามารถแทนการปรึกษาแพทย์ได้
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', mb: 1, textIndent: '20px' }}
          >
            3. การขออนุญาตใช้งาน
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <IoMdCamera
              size={35}
              color={COLORS.blue[6]}
              style={{ marginRight: '8px' }}
            />
            <Typography variant="body2">
              แอปจำเป็นต้องขออนุญาตเข้าถึงกล้องเพื่อถ่ายภาพบาดแผล
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaFolderOpen
              size={40}
              color={COLORS.blue[6]}
              style={{ marginRight: '8px' }}
            />
            <Typography variant="body2">
              แอปจำเป็นต้องขออนุญาตเข้าถึงพื้นที่จัดเก็บข้อมูลเพื่อเลือกรูปแผลที่มีอยู่แล้ว
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', mb: 1, textIndent: '20px' }}
          >
            4. ความเป็นส่วนตัวและความปลอดภัย
          </Typography>
          <Typography variant="body2">
            เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ
            รูปแผลที่อัปโหลดจะถูกใช้เพื่อการวิเคราะห์เท่านั้น
            และจะไม่ถูกเก็บไว้บนเซิร์ฟเวอร์ของเราหลังจากการวิเคราะห์เสร็จสิ้น
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', mb: 1, textIndent: '20px' }}
          >
            5. ข้อจำกัดความรับผิดชอบ
          </Typography>
          <Typography variant="body2">
            ข้อมูลและคำแนะนำที่ให้ผ่านแอปนี้มีวัตถุประสงค์เพื่อ
            ให้ข้อมูลทั่วไปเท่านั้นไม่ใช่คำแนะนำทางการแพทย์โปรดปรึกษาแพทย์หรือผู้เชี่ยวชาญทางการแพทย์สำหรับ
            การรักษาที่เหมาะสม
          </Typography>
        </Box>
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3,
        }}
      >
        <Button
          disableElevation={true}
          variant="contained"
          onClick={onClose}
          startIcon={<MdCheck size={24} />}
          sx={{
            width: '35%',
            maxWidth: '200px',
            fontSize: '14px',
            backgroundColor: '#3A9CFD',
            color: 'white',
            borderRadius: '12px',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: '#3367D6',
            },
          }}
        >
          ยอมรับ
        </Button>
      </Box>
    </Dialog>
  );
};

export default TermsDialog;
