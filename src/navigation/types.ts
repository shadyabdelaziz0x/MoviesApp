import {AppRoutes} from './AppRoutes';

export type AppStackParamList = {
  [AppRoutes.MoviesList]: undefined; // No params for MoviesList
  [AppRoutes.MovieDetails]: {movieId: string}; // movieId param is required
};
