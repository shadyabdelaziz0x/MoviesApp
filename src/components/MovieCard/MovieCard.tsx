import React from 'react';
import Card from '../Card';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Movie} from '../../models';
import LinearGradient from 'react-native-linear-gradient';
import Image from '../Image';
import {ImageStyle} from 'react-native-fast-image';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({movie}: MovieCardProps) => {
  const imageStyle: ImageStyle = React.useMemo(
    () => ({
      ...styles.poster,
      aspectRatio: (movie.posterWidth ?? 1) / (movie.posterHeight ?? 1),
    }),
    [movie],
  );
  const linearGradientColors = React.useMemo(
    () => ['#fff', '#000', '#000', '#fff'],
    [],
  );
  const linearGradientStart = React.useMemo(() => ({x: 0, y: 0}), []);
  const linearGradientEnd = React.useMemo(() => ({x: 1, y: 0}), []);

  return (
    <Card style={styles.card}>
      <TouchableOpacity style={styles.button}>
        <LinearGradient
          start={linearGradientStart}
          end={linearGradientEnd}
          style={styles.imageContainer}
          colors={linearGradientColors}>
          <Image src={movie.poster} style={imageStyle} resizeMode="cover" />
        </LinearGradient>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 300,
    maxHeight: 300,
    backgroundColor: 'black',
    borderRadius: 12,
    flexDirection: 'row',
    shadowColor: '#fff',
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  poster: {
    height: 200,
    borderRadius: 12,
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

export default React.memo(MovieCard);
