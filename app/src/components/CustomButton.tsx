import {useTheme} from 'context/ThemeContext';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const {theme} = useTheme();

  const getContainerStyle = (): ViewStyle => {
    const {primary, secondary, secondary: border} = theme;

    const base: ViewStyle = {
      ...styles.button,
      backgroundColor:
        variant === 'primary'
          ? primary
          : variant === 'secondary'
          ? secondary
          : 'transparent',
      borderColor: variant === 'outline' ? border || primary : 'transparent',
      borderWidth: variant === 'outline' ? 1.5 : 0,
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    return base;
  };

  const getTextStyle = (): TextStyle => {
    const {text, primary} = theme;

    return {
      ...styles.text,
      color:
        variant === 'outline' ? primary : variant === 'secondary' ? text : text,
      ...textStyle,
    };
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={getContainerStyle()}
      activeOpacity={0.8}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? theme.primary : '#fff'}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CustomButton;
