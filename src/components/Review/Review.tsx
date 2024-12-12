import React from 'react';
import Card from '../Card';
import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native';
import {user} from '../../assets';
import {StarRatingDisplay} from 'react-native-star-rating-widget';

interface ReviewProps {
  author?: string;
  body?: string;
  rating?: number;
}

const Review = ({body, author, rating}: ReviewProps) => {
  return (
    <Card style={styles.container}>
      <Image style={styles.image} source={user} resizeMode="contain" />
      <Text style={styles.body}>{body}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{author}</Text>
        <StarRatingDisplay starSize={20} rating={rating ?? 0} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    gap: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  info: {
    gap: 10,
  },
  body: {
    color: 'white',
  },
  name: {
    color: 'white',
  },
});

export default Review;
