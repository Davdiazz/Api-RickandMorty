import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screen/Home';
const Stack = createStackNavigator();

const StackN = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='home' 
        component={Home} 
        options={{
          headerShown: false 
        }}
      />
    </Stack.Navigator>
  );
}

export default StackN;