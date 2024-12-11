import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type CardProps = React.PropsWithChildren<{style?: ViewStyle}>;

const Card = ({style, children}: CardProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 0},
    elevation: 4,
    borderRadius: 12,
  },
});
export default Card;
