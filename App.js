import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, SavedScreen, SearchScreen } from './screens';
import { Icon } from 'react-native-paper';
import {  DBContext, useDB } from './useDB';
import { registerRootComponent } from 'expo';

const Tab = createBottomTabNavigator();

export default function App() {
  const db = useDB()
  return (
    <DBContext.Provider value={db}>      
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Current Weather" component={HomeScreen} options={{tabBarIcon:(props)=><Icon source="map-marker-outline" {...props}/>}}/>
          <Tab.Screen name="City Search" component={SearchScreen} options={{tabBarIcon:(props)=><Icon source="magnify" {...props}/>}}/>
          <Tab.Screen name="Saved Cities" component={SavedScreen} options={{tabBarIcon:(props)=><Icon source="heart-outline" {...props}/>}} />
        </Tab.Navigator>
      </NavigationContainer>
    </DBContext.Provider>
  );
}
registerRootComponent(App);
