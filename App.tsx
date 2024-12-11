/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {MoviesList} from './src/screens';
import {useAppDispatch, useAppSelector} from './src/hooks';
import {fetchMovies, selectMovies} from './src/slices';
import {Provider} from 'react-redux';
import {store} from './src/app/store';

function AppView(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {entities} = useAppSelector(selectMovies);
  useEffect(() => {
    entities.length === 0 &&
      dispatch(fetchMovies({query: 's', isInitial: true}));
  }, [dispatch, entities]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MoviesList />
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppView />
    </Provider>
  );
}

export default App;
