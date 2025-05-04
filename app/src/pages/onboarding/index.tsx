import Icon from '@assets/icon.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';

const {width, height} = Dimensions.get('window');

// const onboardingData = [/* seperti di atas */];
const onboardingData = [
  {
    key: 1,
    title: 'Tons of product collections',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, asperiores.',
    image: require('@assets/onboarding-image-1.png'),
  },
  {
    key: 2,
    title: 'Title 2',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, asperiores.',
    image: require('@assets/onboarding-image-2.png'),
  },
  {
    key: 3,
    title: 'Title 3',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, asperiores.',
    image: require('@assets/onboarding-image-3.png'),
  },
];

type Props = NativeStackNavigationProp<
  {
    Login: undefined;
    OnboardingPage: undefined;
  },
  'OnboardingPage'
>;

export default function OnboardingPage({navigation}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      carouselRef.current?.scrollTo({index: currentIndex + 1});
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Carousel
        ref={carouselRef}
        width={width}
        data={onboardingData}
        scrollAnimationDuration={500}
        onSnapToItem={index => {
          console.log('index', index);
          setCurrentIndex(index);
        }}
        // enabled={false}
        loop={false}
        renderItem={({item}) => (
          <ImageBackground
            source={item.image}
            style={styles.imageBackground}
            resizeMode="cover">
            <View style={styles.contentContainer}>
              <Icon style={styles.icon} height={50} />
            </View>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              style={styles.contentContainer}>
              <View style={styles.bottomContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.pagination}>
                  {onboardingData.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        currentIndex === index && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>
                    {currentIndex === onboardingData.length - 1
                      ? 'Get Started'
                      : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ImageBackground>
        )}
      />

      {/* <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FE7E00',
  },
  imageBackground: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  icon: {
    marginTop: height * 0.067,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomContent: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: height * 0.05,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'grey',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FE7E00',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#ff6a00',
  },
});
