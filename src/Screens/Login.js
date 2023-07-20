import React, { useEffect, useInsertionEffect, useState } from 'react';
import { container } from '../Styles/GlobalStyles';
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [userInformation, setUserInformation] = useState(null);


  useEffect(() => {
    GoogleSignin.configure({ webClientId: "704837690056-hsrp7o6rpk4tun65hvtuhmooi2bvnlcc.apps.googleusercontent.com" })
  }, [])
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      Clipboard.setString(userInfo.user.email)
      setUserInformation(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(' user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS'); 
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE')
      } else {
        console.log('some other error happened' , error)
      }
    }
  };

  const SaveLoacal = async (name, email, userId) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('UID', userId);
    navigation.navigate('Home')
  }

  const LoggingUserIN = async () => {
    setVisible(true)
    await firestore()
      .collection('alphaUsers')
      .where("dbEmail", "==", email)
      .get()
      .then(res => {
        if (res.docs !== []) {
          setVisible(false)
          const x = (JSON.stringify(res.docs[0].data().dbPassword))
          if ((x.replace(/['"]/g, '')) == Password) {
            console.log('VERIFED USER')
            SaveLoacal(
              res.docs[0].data().dbName,
              res.docs[0].data().dbEmail,
              res.docs[0].data().dbUserId
            )

          } else {
            console.log('VERIFED FAILED')
          }

        }
      }).catch(err => {
        setVisible(false)
        console.log('User Not Found')

      })
  }

  return (
    <View style={container}>
      <StatusBar backgroundColor={'#30d5c8'} barStyle={'dark-content'} />
      <Text style={Styles.LogoText}>AlphaZ</Text>

      <View>
        <TextInput style={Styles.placeholderGeneric} placeholder='example@email.com' placeholderTextColor={'#ffc845'} onChangeText={e => { setEmail(e) }} />
        <TextInput style={Styles.placeholderGeneric} placeholder='Password' placeholderTextColor={'#ffc845'} onChangeText={e => { setPassword(e) }} />
      </View>

      <TouchableOpacity style={Styles.LoginTouchable} onPress={() => { LoggingUserIN() }}>
        <Text style={Styles.LoginText}>Login</Text>
      </TouchableOpacity>

      <View style={Styles.LoginView}>
        <Text style={{ color: '#fff' }}>Don't Have an Accoount?  </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}>
          <Text style={[Styles.ColorUnderline, { marginBottom: 15 }]}>SignUp</Text>
        </TouchableOpacity>
      </View>

      {/* GOOGLE SIGNIN */}

      <View style={Styles.LoginViewGoogle}>
        <Text style={{ color: '#fff' }}>-----------OR-----------</Text>
        <TouchableOpacity onPress={() => { signIn()}}>
          <Text style={Styles.GoogleText}>Google</Text>
        </TouchableOpacity>
      </View>
      <Loader visible={visible} />

    </View>
  );
}

const Styles = StyleSheet.create({
  LogoText: {
    color: '#fcdf9a',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  placeholderGeneric: {
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: '#ffc845',
  },
  LoginTouchable: {
    backgroundColor: '#30d5c8',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  LoginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ColorUnderline: {
    color: '#ffc845',
    textDecorationLine: 'underline',
    fontWeight: "bold",
  },
  LoginView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: "center",
  },
  LoginViewGoogle: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  GoogleText: {
    backgroundColor: 'rgba(48,48,48,0.5)',
    textAlign: 'center',
    marginTop: 15,
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 20,
    borderBottomColor: '#4285F4',
    borderRightColor: '#EA4335',
    borderTopColor: '#FBBC05',
    borderLeftColor: '#34A853',
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
  },
})

export default Login;
