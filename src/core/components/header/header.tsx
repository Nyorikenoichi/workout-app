import * as React from 'react';
import { IconButton, Menu } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ContextApp } from '../../store/reducers/globalStateReducer';
import HeaderContainer from './components/HeaderContainer';
import Logout from './components/logout';
import { logOutAction } from '../../store/thunk/auth';
import { HeaderTitle } from './components/headerTitle';
import { AccountCircleIcon } from './components/AccountCircleIcon';
import { MenuItemLogout } from './components/menuItemLogout';
import { MenuLabel } from './components/menuLabel';
import { UserMenu } from './components/userMenu';

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
          <UserMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            keepMounted
            open={!!anchorEl}
            onClose={onCloseMenu}
          >
            <MenuLabel>{state.user.displayName}</MenuLabel>
            <MenuLabel>{state.user.email}</MenuLabel>
            <MenuItemLogout onClick={logout}>{t('sign_out')}</MenuItemLogout>
          </UserMenu>
        </Logout>
      )}
    </HeaderContainer>
  );
};
