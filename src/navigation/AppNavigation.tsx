import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppRoutes} from './AppRoutes';
import {MovieDetails, MoviesList} from '../screens';
import {AppStackParamList} from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AppRoutes.MoviesList}>
        <Stack.Screen
          name={AppRoutes.MoviesList}
          component={MoviesList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AppRoutes.MovieDetails}
          component={MovieDetails}
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
