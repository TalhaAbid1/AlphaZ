import React, { useState } from 'react';
import { container } from '../Styles/GlobalStyles';
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Signup = ({navigation}) => {
  const[name , setName] = useState('')
  const[email , setEmail] = useState('')
  const[password , setPassword] = useState('')

  const RegisterUser = () =>{
    const userUniqueId = uuid.v4()
    console.log(userUniqueId);
    firestore().collection('alphaUsers').doc(userUniqueId).set({
      dbUserId: userUniqueId,
      dbName : name,
      dbEmail : email,
      dbPassword : password
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <View style={container}>
      <StatusBar backgroundColor={'#30d5c8'} barStyle={'dark-content'} />
      <Text style={Styles.LogoText}>AlphaZ</Text>

      <View>
        <TextInput style={Styles.placeholderGeneric} placeholder='Jhon Doe' placeholderTextColor={'#ffc845'} onChangeText={e=>{setName(e)}} />
        <TextInput style={Styles.placeholderGeneric} placeholder='example@email.com' placeholderTextColor={'#ffc845'} onChangeText={e=>{setEmail(e)}} />
        <TextInput style={Styles.placeholderGeneric} placeholder='Password' placeholderTextColor={'#ffc845'} onChangeText={e=>{setPassword(e)}} secureTextEntry />
      </View>

      <TouchableOpacity style={Styles.SignupTouchable} onPress={() => RegisterUser() }>
        <Text style={Styles.SignupText} >SignUp</Text>
      </TouchableOpacity>

      <View style={Styles.SignUpView}>
        <Text style={{ color: '#fff' }}>Do You Already Have an Accoount?  </Text>
        <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
          <Text style={[Styles.ColorUnderline, { marginBottom: 15 }]}>Login</Text>
        </TouchableOpacity>
      </View>

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
  SignupTouchable: {
    backgroundColor: '#30d5c8',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  SignupText: {
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
  SignUpView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: "center"
  }
})

export default Signup;
