import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Movie, RequestError, RequestStatus} from '../models';
import {moviesService} from '@shady0x7cb/network-sdk';
import {ReducerType} from './types';
import {AppState} from '../app/store';
import {GetMoviesResponse} from '@shady0x7cb/network-sdk';

const INITIAL_MOVIES_NUMBER = 10;

export interface MoviesState {
  entities: Array<Movie>;
  error: RequestError;
  loading: RequestStatus;
}

const initialState: MoviesState = {
  entities: [],
  error: null,
  loading: 'idle',
};

export enum MoviesActionType {
  FetchMovies = 'movies/fetchMovies',
}

const moviesMapper = (response: GetMoviesResponse): Array<Movie> => {
  const movies: Array<Movie> = response.description.map(movie => ({
    id: movie['#IMDB_ID'],
    title: movie['#TITLE'],
    poster: movie['#IMG_POSTER'],
    posterWidth: movie.photo_width,
    posterHeight: movie.photo_height,
  }));
  return movies;
};

const getNRandomMovies = (movies: Array<Movie>, num: number): Array<Movie> => {
  const shuffled = [...movies]; // Create a copy to avoid mutating the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, num);
};

export const fetchMovies = createAsyncThunk<
  {data: Array<Movie>},
  {query: string; isInitial?: boolean},
  {state: AppState; rejectValue: RequestError}
>(MoviesActionType.FetchMovies, async (input, {rejectWithValue}) => {
  try {
    const data = await moviesService.getMovies(input.query);
    const movies = moviesMapper(data);
    return {
      data: input.isInitial
        ? getNRandomMovies(movies, INITIAL_MOVIES_NUMBER)
        : movies,
    };
  } catch (err) {
    return rejectWithValue(err as RequestError);
  }
});

const moviesSlice = createSlice({
  name: ReducerType.Movies,
  initialState,
  reducers: {
    resetMovies: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.entities = action.payload.data;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchMovies.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      });
  },
});

export const {resetMovies} = moviesSlice.actions;

export const selectMovies = (state: AppState) => state.movies;

export const moviesReducer = moviesSlice.reducer;
