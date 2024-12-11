import React from 'react';
import Card from '../Card';
import {StyleSheet, Text} from 'react-native';

interface KeywordProps {
  word: string;
}

const Keyword = ({word}: KeywordProps) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{word}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});

export default Keyword;
