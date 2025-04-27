import React, { type FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { type RootState } from '../store';
import AppStackNavigator from './AppStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const Navigator: FC = () => {
  const user = useSelector((state: RootState) => state.users.user.data);
  return (
    <>
      {user === null ? <AuthStackNavigator /> : <AppStackNavigator />}
    </>
  );
};

export default Navigator;
