import React from 'react';
import { View, StyleSheet, Modal, ActivityIndicator, Dimensions, Text } from 'react-native';

const Loader = ({visible}) => {
    return (
        <Modal visible={visible} transparent>
            <View style={styles.ModleView}>
                <Text style={styles.Txt}>Wait PLease ⚠️</Text>
                <View style={styles.mainView}>
                    <ActivityIndicator size={'large'} color={"#7d5ba6"} />
                </View>
            </View>
        </Modal>    
    );
}

const styles = StyleSheet.create({
    ModleView:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center',
    },
    mainView:{
        height:100,
        width:100,
        borderRadius:50,
        backgroundColor:'#30d5c8',
        justifyContent:'center',
        alignContent:'center',
    },
    Txt:{
        color:'#fff',
        fontSize:18,
        marginBottom:15,
    }
})

export default Loader;