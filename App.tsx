import React, {useEffect} from 'react';
import {useAppDispatch} from './src/hooks';
import {fetchRandomMovies} from './src/slices';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {AppNavigation} from './src/navigation';
import Toast from 'react-native-toast-message';
import {ErrorBoundary} from './src/components';

function AppStarter(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRandomMovies());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <AppNavigation />
    </ErrorBoundary>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppStarter />
      <Toast />
    </Provider>
  );
}

export default App;
