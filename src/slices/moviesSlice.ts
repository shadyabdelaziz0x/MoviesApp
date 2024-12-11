import {Movie, RequestError, RequestStatus} from '../models';

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
  FetchAllergens = 'allergens/fetchAllergens',
}

export const fetchAllergens = createAsyncThunk<
  AllergensPayload,
  void,
  {state: AppState; rejectValue: RequestError}
>(
  AllergensActionType.FetchAllergens,
  async (_, {getState, rejectWithValue}) => {
    try {
      const api = getState().config.api;
      const data = await api.getAllergens();
      return {data};
    } catch (err) {
      return rejectWithValue(err as RequestError);
    }
  },
);

const moviesSlice = createSlice({
  name: ReducerType.Allergens,
  initialState,
  reducers: {
    resetAllergens: state => ({...initialState, entities: state.entities}),
    setSelectedAllergens: (state, action) => {
      state.selectedAllergens = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllergens.fulfilled, (state, action) => {
        state.entities = action.payload.data;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchAllergens.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchAllergens.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      });
  },
});

export const {resetAllergens, setSelectedAllergens} = allergensSlice.actions;

export const selectAllergens = (state: AppState) => state.allergens;

export const selectSelectedAllergens = (state: AppState) =>
  state.allergens.selectedAllergens;

export const selectSelectedAllergenNames = createSelector(
  (state: AppState) => {
    const {entities: allergens, selectedAllergens} = state.allergens;
    return {allergens, selectedAllergens};
  },
  ({allergens, selectedAllergens}) => {
    if (!selectedAllergens) return [];
    const selected = selectedAllergens.map(i => {
      const allergen = allergens.find(a => a.allergen_id === i.allergen_id);
      return allergen ? allergen.name ?? '' : '';
    });
    return selected;
  },
);

export const moviesReducer = moviesSlice.reducer;
