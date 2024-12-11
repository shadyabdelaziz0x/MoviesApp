/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from './src/hooks';
import {fetchMovies, selectMovies} from './src/slices';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {AppNavigation} from './src/navigation';

function AppView(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {entities} = useAppSelector(selectMovies);
  useEffect(() => {
    entities.length === 0 &&
      dispatch(fetchMovies({query: 's', isInitial: true}));
  }, [dispatch, entities]);

  return (
    <SafeAreaView style={styles.container}>
      <AppNavigation />
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

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
