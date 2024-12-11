import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

interface EmptyViewProps {
  style?: ViewStyle;
  title?: string;
}

const EmptyView = ({style, title}: EmptyViewProps) => {
  return (
    <View style={style}>
      <Text style={styles.title}>{title ?? 'Empty ...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
export default EmptyView;
