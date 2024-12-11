import React, {useCallback} from 'react';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {EmptyView, MovieCard, SearchList} from '../../components';
import {Movie} from '../../models';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchMovies, resetMovieDetails, selectMovies} from '../../slices';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AppRoutes} from '../../navigation';
import MoviesListSkeleton from './MoviesList.skeleton';

const MoviesList = () => {
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<any>();
  const {entities, loading} = useAppSelector(selectMovies);
  const isLoading = loading === 'pending';

  useFocusEffect(
    React.useCallback(() => {
      dispatch(resetMovieDetails());
    }, [dispatch]),
  );

  const navigateToMovieDetails = useCallback(
    (movieId: string) => {
      navigate(AppRoutes.MovieDetails, {movieId});
    },
    [navigate],
  );

  const renderMovieItem: ListRenderItem<Movie> = useCallback(
    ({item}) => {
      return (
        <MovieCard
          onClick={() => navigateToMovieDetails(item.id)}
          movie={item}
        />
      );
    },
    [navigateToMovieDetails],
  );

  const renderSeparator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  const onFilter = useCallback(
    (filterValue: string | null) => {
      filterValue && dispatch(fetchMovies({query: filterValue}));
    },
    [dispatch],
  );

  const renderEmptyView = useCallback(() => {
    return <EmptyView title={'Cannot Find Movies'} />;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movies</Text>
      <SearchList
        data={entities}
        isLoading={isLoading}
        renderListItem={renderMovieItem}
        filter={onFilter}
        renderSeparator={renderSeparator}
        renderEmptyView={renderEmptyView}
        LoadingView={MoviesListSkeleton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#800000',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  separator: {
    height: 16,
  },
});

export default MoviesList;
