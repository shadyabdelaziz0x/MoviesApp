import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

interface LoaderProps {
  style?: ViewStyle;
}

const Loader = ({style}: LoaderProps) => {
  return (
    <View style={style}>
      <Text style={styles.defaultLoader}>Loading ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultLoader: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
});
export default Loader;
