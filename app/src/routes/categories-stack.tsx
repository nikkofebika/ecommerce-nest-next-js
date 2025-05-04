import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoriesPage from 'pages/categories';

const Stack = createNativeStackNavigator();

export default function CategoriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
