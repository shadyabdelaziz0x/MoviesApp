import useSearch from './useSearch';

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import type {RootState, AppDispatch} from '../app/store';

const useAppDispatch = () => useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useSearch, useAppDispatch, useAppSelector};
