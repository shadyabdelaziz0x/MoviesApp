import React from 'react';
import Card from '../Card';
import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native';
import {user} from '../../assets';

interface ActorProps {
  name?: string;
}

const Actor = ({name}: ActorProps) => {
  return (
    <Card style={styles.container}>
      <Image style={styles.image} source={user} resizeMode="contain" />
      <View style={styles.info}>
        <Text numberOfLines={2} lineBreakMode={'tail'} style={styles.name}>
          {name ?? 'Unknown User'}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  name: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Actor;
