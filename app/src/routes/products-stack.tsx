import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsPage from 'pages/products';

const Stack = createNativeStackNavigator();

export default function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductsPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
