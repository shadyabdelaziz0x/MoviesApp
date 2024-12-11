import React, {useCallback} from 'react';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MovieCard, SearchList} from '../../components';
import {Movie} from '../../models';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchMovies, selectMovies} from '../../slices';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from '../../navigation';

const MoviesList = () => {
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<any>();
  const {entities} = useAppSelector(selectMovies);

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

  return (
    <LinearGradient colors={['#000000', 'red']} style={styles.container}>
      <Text style={styles.header}>Movies</Text>
      <SearchList
        data={entities}
        renderListItem={renderMovieItem}
        filter={onFilter}
        renderSeparator={renderSeparator}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
