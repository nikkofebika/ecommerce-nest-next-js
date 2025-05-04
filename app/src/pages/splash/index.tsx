import Icon from '@assets/icon.svg';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SplashPage() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image-splash.png')}
        resizeMode="cover"
        style={styles.image}>
        <Icon style={styles.icon} />
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>Designed & Developed by</Text>
          <Text style={styles.copyrightOwner}>Nikko Fe</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    backgroundColor: 'F4F8FF',
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginTop: height * 0.1,
  },
  copyright: {
    alignItems: 'center',
    position: 'absolute',
    bottom: height * 0.04,
  },
  copyrightText: {
    fontSize: 15,
  },
  copyrightOwner: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
