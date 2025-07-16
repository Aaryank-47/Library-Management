import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import DonateBookScreen from './src/screens/DonateBookScreen';
import DonationsScreen from './src/screens/DonationsScreen';
import DonationDetailsScreen from './src/screens/DonationDetailsScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type DonationsStackParamList = {
  DonationsList: undefined;
  DonationDetails: { donation: any };
};

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const DonationsStack = createStackNavigator<DonationsStackParamList>();

function DonationsStackNavigator() {
  return (
    <DonationsStack.Navigator screenOptions={{ headerShown: false }}>
      <DonationsStack.Screen name="DonationsList" component={DonationsScreen} />
      <DonationsStack.Screen name="DonationDetails" component={DonationDetailsScreen as React.ComponentType<any>} />
    </DonationsStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Donate') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Donations') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Donations" component={DonationsStackNavigator} />
      <Tab.Screen name="Donate" component={DonateBookScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <RootStack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="MainApp" component={TabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
