import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ContextApp } from '../../store/reducers/globalStateReducer';
import HeaderContainer from './components/HeaderContainer';
import Logout from './components/logout';
import { logOutAction } from '../../store/thunk/auth';
import { HeaderTitle } from './components/headerTitle';
import { AccountCircleIcon } from './components/AccountCircleIcon';
import { MenuItemLogout } from './components/menuItemLogout';

export const Header = function Header() {
  const { t } = useTranslation();

  const { state, dispatch } = useContext(ContextApp);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    onCloseMenu();
    dispatch(logOutAction());
  };

  return (
    <HeaderContainer>
      <HeaderTitle variant="h3">{t('main_title')}</HeaderTitle>
      {!!state.user && (
        <Logout>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={onOpenMenu}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            keepMounted
            open={!!anchorEl}
            onClose={onCloseMenu}
          >
            <MenuItem onClick={onCloseMenu}>{state.user.displayName}</MenuItem>
            <MenuItem onClick={onCloseMenu}>{state.user.email}</MenuItem>
            <MenuItemLogout onClick={logout}>{t('sign_out')}</MenuItemLogout>
          </Menu>
        </Logout>
      )}
    </HeaderContainer>
  );
};
