import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

interface EmptyListProps {
  style?: ViewStyle;
}

const EmptyList = ({style}: EmptyListProps) => {
  return (
    <View style={style}>
      <Text style={styles.title}>Empty ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
});
export default EmptyList;
