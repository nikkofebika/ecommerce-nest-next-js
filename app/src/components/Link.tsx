import {useTheme} from 'context/ThemeContext';
import {FC} from 'react';
import {
  GestureResponderEvent,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

type Props = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: TextStyle;
};
const Link: FC<Props> = ({label, onPress, style}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[{color: theme.primary}, style]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Link;
