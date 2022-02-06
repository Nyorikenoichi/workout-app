import { Alert, Dialog, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { setErrorMessageAction } from '../store/actions/globalStateActions';
import { ContextApp } from '../store/reducers/globalStateReducer';

export default function ErrorMessage() {
  const { state, dispatch } = useContext(ContextApp);

  const { t } = useTranslation();

  const closeMessage = () => {
    dispatch(setErrorMessageAction({ errorMessage: '' }));
  };

  return (
    <Dialog open={!!state.errorMessage}>
      <Alert severity="error">{t(state.errorMessage)}</Alert>
      <DialogActions>
        <Button onClick={closeMessage}>{t('close')}</Button>
      </DialogActions>
    </Dialog>
  );
}
