import * as React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainRoutes from '../../core/constants/mainRoutes';

export default function PageNotFound() {
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h4">{t('page_not_found')}</Typography>
      <Typography>
        {t('back_to_main1')}
        <Link to={MainRoutes.main}>{t('back_to_main2')}</Link>
      </Typography>
    </div>
  );
}
