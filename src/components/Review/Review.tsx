import React from 'react';
import Card from '../Card';
import {StyleSheet, Text, View} from 'react-native';
import Image from '../Image';
import {user} from '../../assets';

interface ReviewProps {
  author: string;
  body: string;
  rating: number;
}

const Review = ({body, author, rating}: ReviewProps) => {
  return (
    <Card style={styles.container}>
      <Image style={styles.image} src={user} />
      <Text style={styles.body}>{body}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{author}</Text>
        <Text style={styles.name}>{`${rating}`}</Text>
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
  info: {},
  body: {
    color: 'white',
  },
  name: {
    color: 'white',
  },
});

export default Review;
