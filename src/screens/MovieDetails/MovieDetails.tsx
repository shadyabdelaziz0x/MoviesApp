import {RouteProp} from '@react-navigation/native';
import React, {Fragment, useCallback, useEffect} from 'react';
import {AppRoutes, AppStackParamList} from '../../navigation';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Actor, EmptyView, Image, Keyword, Review} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchMovieDetails, selectMovieDetails} from '../../slices';
import {placeholder} from '../../assets';
import MovieDetailsSkeleton from './MovieDetails.skeleton';
import {Actor as ActorModel} from '../../models';
import Toast from 'react-native-toast-message';

type MovieDetailsRouteProp = RouteProp<
  AppStackParamList,
  AppRoutes.MovieDetails
>;

interface MovieDetailsProps {
  route: MovieDetailsRouteProp;
}

const ACTOR_LENGTH = 100;
const ACTOR_SEPARATOR_LENGTH = 16;

const MovieDetails = ({route}: MovieDetailsProps) => {
  const {movieId} = route.params; // Assume `movie` contains all required data
  const dispatch = useAppDispatch();
  const {entity: movie, loading, error} = useAppSelector(selectMovieDetails);
  const isLoading = loading === 'pending';
  const hasReviews = (movie?.reviews?.length ?? 0) > 0;
  const hasKeywords = (movie?.keywords?.length ?? 0) > 0;

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        swipeable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchMovieDetails({movieId}));
  }, [dispatch, movieId]);

  const renderActor: ListRenderItem<ActorModel> = useCallback(({item}) => {
    return <Actor key={item.name} name={item.name} />;
  }, []);

  const renderSeparator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  const getItemLayout = (
    _data: ArrayLike<ActorModel> | null | undefined,
    index: number,
  ) => {
    return {
      length: ACTOR_LENGTH,
      offset: (ACTOR_LENGTH + ACTOR_SEPARATOR_LENGTH) * index,
      index,
    };
  };

  const renderEmptyActors = useCallback(() => {
    return <EmptyView title={'Actors Not Found'} />;
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {isLoading ? (
          <MovieDetailsSkeleton />
        ) : (
          <Fragment>
            <Image
              src={movie?.poster ?? placeholder}
              style={styles.poster}
              resizeMode={'contain'}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{movie?.title}</Text>
              <Text style={styles.description}>{movie?.description}</Text>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Actors</Text>
                <FlatList
                  horizontal
                  keyExtractor={item => item.name}
                  data={movie?.actors ?? []}
                  renderItem={renderActor}
                  ItemSeparatorComponent={renderSeparator}
                  getItemLayout={getItemLayout}
                  contentContainerStyle={styles.actorsListContent}
                  ListEmptyComponent={renderEmptyActors}
                />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Keywords</Text>
                <View style={styles.keywordsContainer}>
                  {hasKeywords ? (
                    movie?.keywords?.map(keyword => (
                      <Keyword key={keyword} word={keyword} />
                    ))
                  ) : (
                    <EmptyView
                      style={styles.emptyKeywords}
                      title={'Cannot Find Keywords'}
                    />
                  )}
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <View style={styles.reviewContainer}>
                  {hasReviews ? (
                    movie?.reviews?.map(review => (
                      <Review
                        key={review.id}
                        author={review.author?.name}
                        body={review.body}
                        rating={review.rating}
                      />
                    ))
                  ) : (
                    <EmptyView title={'Cannot Find Reviews'} />
                  )}
                </View>
              </View>
            </View>
          </Fragment>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  poster: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    lineHeight: 24,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  keywordsContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 20,
    columnGap: 20,
  },
  reviewContainer: {
    marginVertical: 15,
  },
  separator: {
    width: ACTOR_SEPARATOR_LENGTH,
  },
  actorsListContent: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  emptyKeywords: {
    width: '100%',
  },
});

export default MovieDetails;
