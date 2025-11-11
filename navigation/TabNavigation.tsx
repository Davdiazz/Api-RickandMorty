import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Setting from '../screen/Setting';
import StackN from './StackN';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Inicio"
        component={StackN}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />
      
      <Tab.Screen 
        name='Ajustes' 
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;