import React, {useEffect} from 'react';
import {useAppDispatch} from './src/hooks';
import {fetchRandomMovies} from './src/slices';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {AppNavigation} from './src/navigation';

function AppStarter(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRandomMovies());
  }, [dispatch]);

  return <AppNavigation />;
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppStarter />
    </Provider>
  );
}

export default App;
