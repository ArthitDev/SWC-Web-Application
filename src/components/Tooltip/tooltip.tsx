import { styled } from '@mui/material/styles';
import type { TooltipProps } from '@mui/material/Tooltip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import * as React from 'react';
import COLORS from 'theme/colors';

const ModTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: COLORS.gray[6],
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '35%',
      transform: 'translateX(-50%) rotate(45deg)',
      width: 10,
      height: 10,
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[2],
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: COLORS.primary.main,
    boxShadow: theme.shadows[2],
    fontSize: 14,
    fontFamily: 'Poppins, sans-serif',
    marginTop: 10,
  },
}));

interface ModTooltipProps {
  title: React.ReactNode;
  children: React.ReactElement;
}

export function CustomTooltip({ title, children }: ModTooltipProps) {
  return <ModTooltip title={title}>{children}</ModTooltip>;
}
