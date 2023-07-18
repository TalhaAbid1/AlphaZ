import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated } from 'react-native';
import { container } from '../Styles/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Splash = ({ navigation }) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const CheckFLow = async () => {
        const ID  = await AsyncStorage.getItem('UID');
        if (ID) {
            navigation.navigate('Home')
        }
        else if (!ID) {
            navigation.navigate('Login')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            CheckFLow()
        }, 1500);
        fadeIn()
    }, [])

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={container}>
            <StatusBar backgroundColor={'#30d5c8'} barStyle={'dark-content'} />

            <Animated.View
                style={{opacity:fadeAnim}}>
                <Text style={styles.SplashText}>{'AlphaZ'}</Text>
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    SplashText: {
        alignSelf: 'center',
        color: '#30d5c8',
        fontWeight: 'bold',
        fontSize: 25,
    },
    fadingText: {
        fontSize: 28,
    },
})

export default Splash;