import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  label: string;
};
const Checkbox = ({label}: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <Pressable onPress={toggleCheckbox} style={styles.container} >
      <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
        {isChecked && (
          <Text style={styles.checkmark}>
            <Icon name="checkmark-sharp" size={20} />
          </Text>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#D0DAEE',
    backgroundColor: '#F4F8FF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    // backgroundColor: '#333',
  },
  checkmark: {
    color: '#1D2A44',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
  },
});
