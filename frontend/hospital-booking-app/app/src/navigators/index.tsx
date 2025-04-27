import React, { type FC, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';

import { type RootState } from '../store';
import { colors } from '../theme/colors';
import AppStackNavigator from './AppStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const Navigator: FC = () => {
  const loader = useSelector((state: RootState) => state.users.loader);
  const message = '' //useSelector((state: RootState) => state.setting.message);
  const dispatch = useDispatch();


  return (
    <>
      {!message ? <AppStackNavigator /> : <AuthStackNavigator />}

      <Spinner
        visible={loader}
        textContent={message === '' ? ' Loading...' : message}
        color={colors.white}
        textStyle={{ color: colors.white }}
      />
    </>
  );
};

export default Navigator;
