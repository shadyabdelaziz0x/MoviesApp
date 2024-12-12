import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {movieDetailsReducer, moviesReducer} from '../slices';

export type AppState = ReturnType<typeof appReducer>;

const appReducer = combineReducers({
  movies: moviesReducer,
  movieDetails: movieDetailsReducer,
});

const rootReducer = (state: AppState | undefined, action: Action) => {
  if (action.type === 'clearState') {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export {store};
