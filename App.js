import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, SavedScreen, SearchScreen } from './screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function SettingsScreen() {
  return(
    <View/>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Current Weather" component={HomeScreen} options={{tabBarIcon:(props)=><Icon source="map-marker-outline" {...props}/>}}/>
        <Tab.Screen name="City Search" component={SearchScreen} options={{tabBarIcon:(props)=><Icon source="magnify" {...props}/>}}/>
        <Tab.Screen name="Saved Cities" component={SavedScreen} options={{tabBarIcon:(props)=><Icon source="heart-outline" {...props}/>}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
