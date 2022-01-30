import * as React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainRoutes from '../../core/constants/mainRoutes';

export default function Exercise() {
  const { t } = useTranslation();

  return (
    <Typography>
      <Link to={MainRoutes.main}>{t('back_to_main')}</Link>
    </Typography>
  );
}
