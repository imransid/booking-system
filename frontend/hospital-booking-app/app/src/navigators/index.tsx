import React, { type FC, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';

import { type RootState } from '../store';
import { checkLoaderAction } from '../store/slices/features/users/slice';
import { colors } from '../theme/colors';
import AppStackNavigator from './AppStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const Navigator: FC = () => {
  const globalLoaderStatus = useSelector((state: RootState) => state.setting.globalAppSyncLoader);
  const message = useSelector((state: RootState) => state.setting.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLoaderAction());
  }, [dispatch]);

  return (
    <>
      {message ? <AppStackNavigator /> : <AuthStackNavigator />}

      <Spinner
        visible={globalLoaderStatus}
        textContent={message === '' ? ' Loading...' : message}
        color={colors.white}
        textStyle={{ color: colors.white }}
      />
    </>
  );
};

export default Navigator;
