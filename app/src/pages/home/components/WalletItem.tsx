import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type WalletItemProps = {
  icon: string;
  iconColor?: string;
  title: string;
  titleColor?: string;
  value: string;
  valueColor?: string;
};
const WalletItem: FC<WalletItemProps> = ({
  icon,
  iconColor = '#FE7E00',
  title,
  titleColor = '#5B6E95',
  value = 0,
  valueColor = '#FFFFFF',
}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} style={[styles.walletIcon, {color: iconColor}]} />
      <View>
        <Text style={[styles.walletTitle, {color: titleColor}]}>{title}</Text>
        <Text style={[styles.walletValue, {color: valueColor}]}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletWrapper: {
    borderRadius: 5,
    padding: 10,
  },
  walletIcon: {
    fontSize: 25,
    marginRight: 5,
  },
  walletTitle: {
    fontSize: 12,
  },
  walletValue: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default WalletItem;
