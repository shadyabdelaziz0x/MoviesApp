import React, {useCallback} from 'react';
import {ListRenderItem, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MovieCard, SearchList} from '../../components';
import {Movie} from '../../models';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchMovies, selectMovies} from '../../slices';

const MoviesList = () => {
  const dispatch = useAppDispatch();
  const {entities} = useAppSelector(selectMovies);

  const renderMovieItem: ListRenderItem<Movie> = useCallback(({item}) => {
    return <MovieCard movie={item} />;
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
  card: {
    backgroundColor: 'black',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 0},
    elevation: 4,
  },
  poster: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
    color: '#fff',
  },
});

export default MoviesList;
