import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {AppRoutes, AppStackParamList} from '../../navigation';
import {Text} from 'react-native';

type MovieDetailsRouteProp = RouteProp<
  AppStackParamList,
  AppRoutes.MovieDetails
>;

const MovieDetails = ({route}: {route: MovieDetailsRouteProp}) => {
  return <Text>{route.params.movieId}</Text>;
};

export default MovieDetails;
