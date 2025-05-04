import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountPage from 'pages/account';

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
