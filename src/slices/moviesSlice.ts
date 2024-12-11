import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Movie, RequestError, RequestStatus} from '../models';
import {moviesService} from '@shady0x7cb/network-sdk';
import {ReducerType} from './types';
import {AppState} from '../app/store';
import {GetMoviesResponse} from '@shady0x7cb/network-sdk/dist/esm/types/getMoviesResponse';

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

export enum AllergensActionType {
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

export const fetchMovies = createAsyncThunk<
  {data: Array<Movie>},
  {query: string},
  {state: AppState; rejectValue: RequestError}
>(AllergensActionType.FetchMovies, async (input, {rejectWithValue}) => {
  try {
    const data = await moviesService.getMovies(input.query);
    return {data: moviesMapper(data)};
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
