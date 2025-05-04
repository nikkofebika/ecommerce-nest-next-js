import {useAuth} from 'context/AuthContext';
import {TTheme, useTheme} from 'context/ThemeContext';
import React, {FC} from 'react';
import {
  GestureResponderEvent,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AccountPage() {
  console.log('AccountPage');
  const {theme} = useTheme();
  const {signOut} = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.profileWrapper, styles.paddingHorizontal]}>
        <Text style={styles.profileName}>Nikko Fe</Text>
        <Image
          source={require('@assets/user-icon.png')}
          style={styles.profileImage}
        />
      </View>
      <List
        title="My Info"
        theme={theme}
        listItems={[
          {
            title: 'Profile',
            icon: 'person-outline',
          },
        ]}
      />
      <List
        title="Setting"
        theme={theme}
        listItems={[
          {
            title: 'Language',
            icon: 'language-outline',
          },
          {
            title: 'Notification',
            icon: 'notifications-outline',
          },
        ]}
      />
      <List
        title="Other"
        theme={theme}
        listItems={[
          {
            title: 'Security',
            icon: 'lock-closed-outline',
          },
          {
            title: 'Logout',
            icon: 'log-out-outline',
            onPress: () => signOut(),
          },
        ]}
      />
    </ScrollView>
  );
}

type ListProps = {
  title: string;
  theme: TTheme;
  listItems: {
    title: string;
    icon: string;
    onPress?: (event: GestureResponderEvent) => void;
  }[];
};
const List: FC<ListProps> = ({theme, title, listItems}) => {
  return (
    <View style={[styles.wrapper, styles.paddingHorizontal]}>
      <Text style={[styles.wrapperTitle, {color: theme.secondary}]}>
        {title}
      </Text>
      {listItems.map((item, index) => (
        <ListItem
          key={index}
          theme={theme}
          title={item.title}
          icon={item.icon}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};

type ListItemProps = {
  theme: TTheme;
  title: string;
  icon: string;
  onPress?: (event: GestureResponderEvent) => void;
};
const ListItem: FC<ListItemProps> = ({theme, title, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.listWrapper} onPress={onPress}>
      <Icon name={icon} style={[styles.leftIcon, {color: theme.muted}]} />
      <View style={styles.subListWrapper}>
        <Text style={[styles.listTitle, {color: theme.muted}]}>{title}</Text>
        <Icon name="chevron-forward" style={{color: theme.muted}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
  },
  wrapper: {
    borderRadius: 10,
    paddingVertical: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
  },
  wrapperTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 3,
  },
  subListWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  leftIcon: {
    fontSize: 15,
  },
  listTitle: {
    fontSize: 15,
  },
});
