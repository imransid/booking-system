import React, { type FC } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Navigator from '../src/navigators';


import { persistor, store } from './store';



const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider >
          <Navigator />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
