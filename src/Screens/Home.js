import React from 'react';
import { themes } from '../Styles/GlobalStyles';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const Home = () => {
    return (
        <View style={themes}>
            <StatusBar backgroundColor={'#30d5c8'} barStyle={'dark-content'} />
            <Text>WELCOME</Text>
        </View>
    );
}

const styles = StyleSheet.create({
})

export default Home;

