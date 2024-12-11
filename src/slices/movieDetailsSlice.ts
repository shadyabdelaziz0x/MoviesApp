import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {MovieDetails, RequestError, RequestStatus} from '../models';
import {GetMovieDetailsResponse, moviesService} from '@shady0x7cb/network-sdk';
import {ReducerType} from './types';
import {AppState} from '../app/store';
import uuid from 'react-native-uuid';

export interface MoviesDetailsState {
  entity: MovieDetails | null;
  error: RequestError;
  loading: RequestStatus;
}

const initialState: MoviesDetailsState = {
  entity: null,
  error: null,
  loading: 'idle',
};

export enum MovieDetailsActionType {
  FetchMovieDetails = 'movies/fetchMovieDetails',
}

const movieMapper = (response: GetMovieDetailsResponse): MovieDetails => {
  return {
    id: response.imdbId,
    title: response.short.name,
    keywords:
      response.short.keywords?.split(',') ??
      response.top.keywords?.edges?.map(keyword => keyword.node.text) ??
      [],
    actors: response.short.actor?.map(actor => ({
      name: actor.name,
      url: actor.url,
    })),
    reviews:
      response.top.featuredReviews?.edges?.map(review => ({
        id: uuid.v4(),
        author: {
          name: review.node.author.nickName,
        },
        body: review.node.text.originalText.plainText,
        date: review.node.submissionDate,
      })) ?? [],
    description: response.short.description,
    poster: response.short.image,
  };
};

export const fetchMovieDetails = createAsyncThunk<
  {data: MovieDetails},
  {movieId: string},
  {state: AppState; rejectValue: RequestError}
>(
  MovieDetailsActionType.FetchMovieDetails,
  async (input, {rejectWithValue}) => {
    try {
      const data = await moviesService.getMovieDetails(input.movieId);
      const movie = movieMapper(data);
      return {
        data: movie,
      };
    } catch (err) {
      return rejectWithValue(err as RequestError);
    }
  },
);

const movieDetailsSlice = createSlice({
  name: ReducerType.MovieDetails,
  initialState,
  reducers: {
    resetMovieDetails: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.entity = action.payload.data;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchMovieDetails.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      });
  },
});

export const {resetMovieDetails} = movieDetailsSlice.actions;

export const selectMovieDetails = (state: AppState) => state.movieDetails;

export const movieDetailsReducer = movieDetailsSlice.reducer;
