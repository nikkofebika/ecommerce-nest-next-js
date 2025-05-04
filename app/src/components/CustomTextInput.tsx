import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  icon?: string;
  secondIcon?: string;
  placeholder?: string;
};

const CustomTextInput = ({
  icon,
  secondIcon,
  placeholder,
}: Props) => {
  return (
    <View style={styles.container}>
      {icon && <Icon name={icon} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
      />
      {secondIcon && <Icon name={secondIcon} style={styles.icon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D0DAEE',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    color: '#1D2A44',
    fontSize: 14,
  },
  icon: {
    color: '#1D2A44',
    fontSize: 16,
    marginRight: 8,
  },
});

export default CustomTextInput;
