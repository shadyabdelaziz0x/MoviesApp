import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
// import {persistReducer} from 'redux-persist';
import {movieDetailsReducer, moviesReducer} from '../slices';
import logger from 'redux-logger';

export type AppState = ReturnType<typeof appReducer>;

const appReducer = combineReducers({
  movies: moviesReducer,
  movieDetails: movieDetailsReducer,
});

const rootReducer = (state: AppState | undefined, action: Action) => {
  if (action.type === 'clearState') {
    AsyncStorage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger),
});

// const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export {store /*persistor*/};
