import React from 'react';
import Card from '../Card';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Movie} from '../../models';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({movie}: MovieCardProps) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity style={styles.card}>
        <Image source={{uri: movie.poster}} style={styles.poster} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#fff',
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

export default React.memo(MovieCard);
