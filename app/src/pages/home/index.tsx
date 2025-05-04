import {useTheme} from 'context/ThemeContext';
import {ScrollView, StyleSheet, View} from 'react-native';
import WalletItem from './components/WalletItem';
import SliderCampaign from './components/SliderCampaign';
import Gap from 'components/Gap';
import { useAuth } from 'context/AuthContext';

export default function HomePage() {
  const auth = useAuth();
  console.log('auth', auth)
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={[styles.walletWrapper, {backgroundColor: theme.secondary}]}>
          <WalletItem
            icon="wallet"
            iconColor={theme.primary}
            title="Wallet"
            value="$ 2,700"
          />
          <WalletItem
            icon="wallet"
            iconColor={theme.primary}
            title="Points"
            value="4,500"
          />
          <WalletItem
            icon="wallet"
            iconColor={theme.primary}
            title="Vouchers"
            value="2"
          />
        </View>
        <Gap height={40} />
        <SliderCampaign />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  walletWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});
