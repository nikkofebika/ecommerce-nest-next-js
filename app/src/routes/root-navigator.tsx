import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from 'context/AuthContext';
import AccountPage from 'pages/account';
import CategoriesPage from 'pages/categories';
import LoginPage from 'pages/login';
import OnboardingPage from 'pages/onboarding';
import SplashPage from 'pages/splash';
import WhistlistPage from 'pages/whistlist';
import { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStack from './home-stack';

const Stack = createNativeStackNavigator();

export type TAuthenticatedTabParamList = {
  HomeTab: undefined;
  CategoriesTab: undefined;
  WhistlistTab: undefined;
  AccountTab: undefined;
};
const Tab = createBottomTabNavigator();

function UnauthenticatedNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(value === 'true');

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    checkOnboarding();
  }, []);

  if (isLoading) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashPage} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!hasSeenOnboarding && (
        <Stack.Screen name="Onboarding" component={OnboardingPage} />
      )}
      <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>
  );
}

const getTabBarIcon =
  (routeName: string) =>
  ({focused, color, size}: {focused: boolean; color: string; size: number}) => {
    let iconName = 'help';

    if (routeName === 'HomeTab') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (routeName === 'CategoriesTab') {
      iconName = focused ? 'list' : 'list-outline';
    } else if (routeName === 'WhistlistTab') {
      iconName = focused ? 'bookmark' : 'bookmark-outline';
    } else if (routeName === 'AccountTab') {
      iconName = focused ? 'person' : 'person-outline';
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  };

function AuthenticatedNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<
          TAuthenticatedTabParamList,
          keyof TAuthenticatedTabParamList
        >;
      }) => ({
        tabBarIcon: getTabBarIcon(route.name),
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CategoriesTab"
        component={CategoriesPage}
        options={{
          tabBarLabel: 'Categories',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WhistlistTab"
        component={WhistlistPage}
        options={{
          tabBarLabel: 'Whistlist',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountPage}
        options={{
          tabBarLabel: 'Account',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const {accessToken} = useAuth();
  return accessToken ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />;
}
