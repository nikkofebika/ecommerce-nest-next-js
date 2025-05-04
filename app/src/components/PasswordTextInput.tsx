import {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  icon?: string;
  secondIcon?: string;
  secondIconOnPress?: string;
  placeholder?: string;
};

const PasswordTextInput = ({
  icon = 'lock-closed',
  secondIcon = 'eye-outline',
  secondIconOnPress = 'eye-off-outline',
  placeholder = 'Password',
}: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryIcon, setSecureTextEntryIcon] = useState(secondIcon);

  const onPress = () => {
    const newStatus = !secureTextEntry;
    setSecureTextEntry(newStatus);
    newStatus
      ? setSecureTextEntryIcon(secondIconOnPress)
      : setSecureTextEntryIcon(secondIcon);
  };

  return (
    <View style={styles.container}>
      {icon && <Icon name={icon} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {secondIcon && (
        <TouchableOpacity onPress={onPress}>
          <Icon name={secureTextEntryIcon} style={styles.icon} />
        </TouchableOpacity>
      )}
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

export default PasswordTextInput;
