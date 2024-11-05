// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image 
        animation="fadeIn"
        duration={1500}
        source={require('../../assets/splashbatik.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Animatable.View 
        animation="fadeInUp"
        delay={500}
        duration={1000}
        style={styles.textContainer}
      >
        <Text style={styles.title}>BATIK APP</Text>
        <Text style={styles.subtitle}>menjaga keseimbangan antara dua hal yang bertentangan</Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8E3C',
  },
  image: {
    width: width,
    height: height,
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    top: 60,
    left: 24,
    right: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    width: '70%',
    lineHeight: 24,
  },
});

export default SplashScreen;