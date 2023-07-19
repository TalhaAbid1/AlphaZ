import React, { useEffect, useState } from 'react';
import { themes } from '../Styles/GlobalStyles';
import { View, Text, StyleSheet, StatusBar, FlatList, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const Home = ({ navigation }) => {

    const [users, setUsers] = useState([])
    const [id, setId] = useState()
    const [myName, setMyName] = useState('')
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        FetchUsers()
    }, [])

    const FetchUsers = async () => {
        const tempArr = []
        const MyEmail = await AsyncStorage.getItem('EMAIL');
        const MyId = await AsyncStorage.getItem('UID');
        const LogedIn = await AsyncStorage.getItem('NAME');
        setId(MyId)
        setMyName(LogedIn)
        await firestore()
            .collection('alphaUsers')
            .where("dbEmail", "!=", MyEmail)
            .get()
            .then(res => {
                if (res.docs !== []) {
                    res.docs.map(item => {
                        tempArr.push(item.data())
                    })
                }
                setUsers(tempArr);
            })
    }

    const Logout = async () => {
        try {
            setVisible(true)
            AsyncStorage.removeItem('NAME')
            AsyncStorage.removeItem('EMAIL')
            AsyncStorage.removeItem('UID')
            navigation.navigate('Login')
            setVisible(false)
        } catch (error) {
            setVisible(false)
            console.log('ERROR WHILE LOGGING YOU OUT', error)
        }
    }

    return (
        <View style={themes}>
            <StatusBar backgroundColor={'#30d5c8'} barStyle={'dark-content'} />
            <View style={styles.HeaderView}>
                <Text style={[styles.HeaderText , {fontSize:20,}]}>Welcome</Text>
                <Text style={[styles.HeaderText , {fontSize:18,}]}>👋🏻 Hello - {myName}</Text>
            </View>
            <FlatList
                data={users}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.UserRow} onPress={() => { navigation.navigate('Chat', { data: item, id: id }) }}>
                            <Image style={styles.UserImg} source={require('../resources/profile.png')} />
                            <Text style={styles.UserRowText}>
                                {item.dbName.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    )
                }} />

            <TouchableOpacity style={styles.LogoutView} onPress={() => {
                Alert.alert('Sign Out', 'Are You Sure..!', [
                    {
                        text: 'NO',
                    },
                    {
                        text: 'Yes',
                        onPress: () => Logout()
                    },
                ]);
            }}>
                <Image source={require('../resources/logout.png')} />
            </TouchableOpacity>

            <Loader visible={visible} />

        </View>
    );
}

const styles = StyleSheet.create({
    HeaderView:{
        width:Dimensions.get('window').width,
        backgroundColor:'rgba(48, 48, 48,0.5)',
        paddingVertical:10,
        paddingHorizontal:10,
        justifyContent:'space-between',
        flexDirection:'row',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderBottomColor:'#30d5c8',
        borderTopColor:'#7d5ba6',
        borderWidth:1,
    },
    HeaderText:{
        alignItems:'center',
        color:'#30d5c8',
        fontWeight:'bold',
        textAlign :'center',
    },
    UserRow: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#30d5c8',

    },
    UserRowText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        paddingHorizontal: 15,
    },
    UserImg: {
        height: 35,
        width: 35,
    },
    LogoutView: {
        zIndex: 1,
        position: 'absolute', 
        alignSelf:'flex-end',
        bottom:10,
    },
})

export default Home;

