import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './AppNavigation';

export default function App() {
  return (
    <NavigationContainer>
      
   
      <AppNavigation /> 
  

      
    </NavigationContainer>
  );
} 

