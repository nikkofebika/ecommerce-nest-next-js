import {Button} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';

export default function WhistlistPage() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Products PAGE</Text>
      <Button onPress={() => navigation.navigate('Categories')}>
        Go to Details
      </Button>

      <Button onPress={() => navigation.setOptions({title: 'SILIT'})}>
        Update Title to SILIT
      </Button>
    </View>
  );
}
