import Slider1 from '@assets/home/sliders/image-1.png';
import {useTheme} from 'context/ThemeContext';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SliderCampaign = () => {
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={[styles.title, styles.textBold]}>New collections</Text>
        <Text style={styles.title}>
          is <Text style={[styles.textBold, styles.textItalic]}>available</Text>
        </Text>
        <View style={styles.learnMoreWrapper}>
          <Text style={[styles.learnMoreText]}>Learn more</Text>
          <Icon name="chevron-forward" style={styles.learnMoreIcon} />
        </View>
      </View>
      <View style={styles.rightContent}>
        <Image source={Slider1} style={styles.sliderImage} />
      </View>
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#DCA3B7',
    height: height * 0.172,
  },
  leftContent: {
    width: '50%',
    paddingVertical: 15,
    paddingHorizontal: 13,
  },
  rightContent: {
    width: '50%',
    backgroundColor: 'reen',
    // overflow: 'hidden',
  },
  sliderImage: {
    position: 'absolute',
    top: -20,
    right: 0,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textItalic: {
    fontStyle: 'italic',
  },
  learnMoreWrapper: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  learnMoreText: {
    fontWeight: '500',
    marginRight: 8,
    color: '#39455C',
    textDecorationLine: 'underline',
  },
  learnMoreIcon: {
    color: '#39455C',
    fontSize: 14,
  },
});

export default SliderCampaign;

// import Slider1 from '@assets/home/sliders/image-1.png';
// import {useTheme} from 'context/ThemeContext';
// import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const SliderCampaign = () => {
//   const {theme} = useTheme();
//   return (
//     <View style={styles.wrapper}>
//       {/* Gambar (nongol ke atas) */}
//       <Image source={Slider1} style={styles.sliderImage} />

//       {/* Box pink */}
//       <View style={styles.card}>
//         <View style={styles.leftContent}>
//           <Text style={styles.title}>New collections</Text>
//           <Text style={styles.subtitle}>
//             is <Text style={styles.highlight}>available!</Text>
//           </Text>
//           <Text style={styles.link}>Learn more ➔</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const {height} = Dimensions.get('window');

// const styles = StyleSheet.create({
//   wrapper: {
//     margin: 16,
//     position: 'relative',
//     height: 180, // cukup tinggi buat nampung gambar di atas + card-nya
//   },
//   sliderImage: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     width: 150,
//     height: 150,
//     resizeMode: 'contain',
//     zIndex: 2, // di atas card
//   },
//   card: {
//     backgroundColor: '#FCD3E1',
//     borderRadius: 20,
//     overflow: 'hidden',
//     flexDirection: 'row',
//     height: 130,
//     marginTop: 50, // geser ke bawah biar gambar bisa nongol
//     padding: 16,
//     zIndex: 1,
//   },
//   leftContent: {
//     width: '60%',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1a1a1a',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#1a1a1a',
//   },
//   highlight: {
//     color: 'green',
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 10,
//     fontSize: 14,
//     color: '#1a1a1a',
//     textDecorationLine: 'underline',
//   },
// });

// export default SliderCampaign;
