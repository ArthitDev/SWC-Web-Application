import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { InfoIcon } from 'lucide-react';
import Image from 'next/image';
import router from 'next/router';
import React, { useState } from 'react';
import COLORS from 'themes/colors';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';
import ScrollFadeIn from 'utils/ScrollFadeIn';

import AboutCard from '@/components/app/home/AboutCard';
import FeatureDialog from '@/components/modal/FeatureModal';
import ScrollToTopButton from '@/utils/ScrollToTopMain';

import DidyouknowCardHome from './DidyouknowCard';
import FeatureBadge from './FeatureBadge';
import HeaderIconRight from './HeaderIconRight';
import InfoCard from './InfoCard';
import TopArticlesCard from './TopArticlesCard';
import TrickCardHome from './TrickCard';

const MainPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    description: '',
    featureType: '',
  });

  const handleOpenDialog = (
    title: string,
    description: string,
    featureType: 'ai' | 'easy' | 'variety'
  ) => {
    setDialogContent({ title, description, featureType });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariants}
      transition={fadeInTransition}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            position: 'relative',
          }}
        >
          <HeaderIconRight
            icon={<InfoIcon color={COLORS.blue[6]} />}
            onClick={() => router.push('/app/about')}
          />

          <ScrollFadeIn>
            <Box sx={{ textAlign: 'center', marginBottom: 2, pt: 2 }}>
              <Image
                src="/images/logo_blue.webp"
                alt="Logo"
                width={300}
                height={120}
                priority
              />
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    color: COLORS.blue[6],
                    textShadow: '3px 3px 0px #a7bdf1',
                  }}
                >
                  Smart . Wound . Care
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: '7px',
                    backgroundColor: '#BFDBFE',
                    borderRadius: '10px',
                    margin: '15px auto',
                  }}
                />
                <Typography sx={{ color: COLORS.gray[11] }}>
                  วิเคราะห์ภาพแผลด้วย Ai เพื่อข้อมูลที่ถูกต้อง
                </Typography>
              </Box>
            </Box>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
              <FeatureBadge
                text="ขับเคลื่อนด้วย AI"
                backgroundColor="#BFDBFE"
                color={COLORS.blue[6]}
                onClick={() =>
                  handleOpenDialog(
                    'ขับเคลื่อนด้วย AI',
                    'ใช้เทคโนโลยี AI ในการวิเคราะห์และประมวลผลภาพแผลด้วยเทคนิค image classification',
                    'ai'
                  )
                }
              />
              <FeatureBadge
                text="ใช้งานง่าย"
                backgroundColor="#DCFCE7"
                color={COLORS.green[5]}
                onClick={() =>
                  handleOpenDialog(
                    'ใช้งานง่าย',
                    'ออกแบบให้ผู้ใช้สามารถใช้งานได้อย่างสะดวกและง่ายดาย ไม่ซับซ้อน ด้วยการออกแบบที่เป็นมิตรกับผู้ใช้',
                    'easy'
                  )
                }
              />
              <FeatureBadge
                text="ข้อมูลหลากหลาย"
                backgroundColor="#FEF9C3"
                color={COLORS.orange[7]}
                onClick={() =>
                  handleOpenDialog(
                    'ข้อมูลหลากหลาย',
                    'รวบรวมข้อมูลที่ครบถ้วนหลากหลายเกี่ยวกับแผล และ การดูแลแผล พร้อมบทความต่างๆ ให้เลือกอ่าน',
                    'variety'
                  )
                }
              />
            </Box>
          </ScrollFadeIn>
          <InfoCard
            title="วิเคราะห์ภาพแผลทันที"
            description="รับการวินิจฉัยแผลโดยการอัปโหลดรูปภาพแผล"
            buttonText="ถ่ายรูปภาพแผล"
            buttonIcon={<CameraAltIcon />}
            onButtonClick={() => router.push('/app/predict')}
          />
          <InfoCard
            title="แผลคืออะไร ?"
            description="แผล คือ การบาดเจ็บหรือความเสียหายที่เกิดขึ้นกับเนื้อเยื่อของร่างกายสามารถเกิดขึ้นมาได้
            จากหลายสาเหตุแผลสามารถแบ่งออกเป็นหลายประเภทตามสาเหตุและลักษณะของแผล . . ."
            buttonText="อ่านเนื้อหาเต็ม"
            buttonIcon={<AutoStoriesIcon />}
            sxDescription={{
              textIndent: '2rem',
              textAlign: 'justify',
              whiteSpace: 'pre-line',
            }}
            onButtonClick={() => router.push('/app/article/1')}
          />
          <ScrollFadeIn>
            <TrickCardHome />
          </ScrollFadeIn>
          <ScrollFadeIn>
            <DidyouknowCardHome />
          </ScrollFadeIn>
          <ScrollFadeIn>
            <Box sx={{ pb: 3, pt: 2 }}>
              <Typography
                variant="h5"
                component="h1"
                fontWeight={'bold'}
                sx={{
                  color: COLORS.blue[6],
                }}
              >
                บทความยอดนิยมสูงสุด 5 อันดับ
              </Typography>
            </Box>
          </ScrollFadeIn>
          <TopArticlesCard />
          <ScrollFadeIn>
            <Box sx={{ pb: 3, pt: 2 }}>
              <Typography
                variant="h5"
                component="h1"
                fontWeight={'bold'}
                sx={{
                  color: COLORS.blue[6],
                }}
              >
                หากมีข้อสงสัยติดต่อเรา
              </Typography>
            </Box>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <AboutCard
              title="เกี่ยวกับเรา"
              description="อ่านเพิ่มเติมเกี่ยวกับบริการของเราและติดต่อเรา"
              buttonText="ไปยังหน้าเกี่ยวกับเรา"
              buttonIcon={<ArrowForwardIcon />}
              onButtonClick={() => router.push('/app/about')}
            />
          </ScrollFadeIn>
        </Box>
        <ScrollFadeIn>
          <ScrollToTopButton />
        </ScrollFadeIn>
        <FeatureDialog
          open={openDialog}
          onClose={handleCloseDialog}
          title={dialogContent.title}
          description={dialogContent.description}
          featureType={dialogContent.featureType as 'ai' | 'easy' | 'variety'}
        />
      </Box>
    </motion.div>
  );
};

export default MainPage;
