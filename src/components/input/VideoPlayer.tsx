import { Box } from '@mui/material';
import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: '56.25%',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
      }}
    >
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </Box>
  );
};

export default VideoPlayer;
