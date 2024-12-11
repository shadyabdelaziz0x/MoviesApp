/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {MoviesList} from './src/screens';
import {moviesService} from '@shady0x7cb/network-sdk';

function App(): React.JSX.Element {
  // useEffect(() => {
  //   moviesService
  //     .getMovies('s')
  //     .then(res => {
  //       console.log('RESPONSE => ', res);
  //     })
  //     .catch(err => {
  //       console.log('ERROR => ', err.response.data.description);
  //     });
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MoviesList />
    </SafeAreaView>
  );
}

export default App;
