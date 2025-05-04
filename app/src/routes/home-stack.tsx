import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from 'pages/home';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
