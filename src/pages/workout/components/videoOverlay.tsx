import * as React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { VideoOverlayWrapper } from './styled/overlay/videoOverlayWrapper';
import { VideoOverlayTitle } from './styled/overlay/videoOverlayTitle';
import { VideoOverlayDescription } from './styled/overlay/videoOverlayDescription';
import { MainRoutes } from '../../../core/constants/mainRoutes';
import { VideoOverlayButton } from './styled/overlay/videoOverlayButton';

export const VideoOverlay = React.memo(function VideoOverlay() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onLeaveWorkout = () => {
    navigate(MainRoutes.main);
  };

  return (
    <VideoOverlayWrapper>
      <VideoOverlayTitle>{t('workout_paused')}</VideoOverlayTitle>
      <VideoOverlayDescription>
        {t('workout_overlay_description')}
      </VideoOverlayDescription>
      <VideoOverlayButton variant="outlined" onClick={onLeaveWorkout}>
        <Typography>{t('leave_workout')}</Typography>
      </VideoOverlayButton>
    </VideoOverlayWrapper>
  );
});
