import React from 'react';
import Card from '../Card';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Movie} from '../../models';
import Image from '../Image';
import {placeholder} from '../../assets';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard = ({movie, onClick}: MovieCardProps) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onClick} style={styles.button}>
        <View style={styles.imageContainer}>
          <Image
            src={movie.poster ?? placeholder}
            style={styles.poster}
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
    height: 300,
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
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 230,
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default React.memo(MovieCard);
