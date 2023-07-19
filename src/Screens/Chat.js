import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat'
import { themes } from '../Styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {

    const Route = useRoute();
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const Subscriber = firestore()
            .collection('Chats')
            .doc(Route.params.id+Route.params.data.dbUserId)
            .collection('messages')
            .orderBy("createdAt","desc");

        Subscriber.onSnapshot(querySnapshot=>{
            const allmessages=querySnapshot.docs.map(item=>{
                return {...item._data}
            })
            setMessages(allmessages)
        })
        // return ()=> {
        //     Subscriber()
        // }
    }, [])

    const onSend = useCallback(async (messages = []) => {
        const msg = messages[0]
        const Mymsg = {
            ...msg,
            SendBy: Route.params.id,
            SendTo: Route.params.data.dbUserId,
            createdAt: Date.parse(msg.createdAt)

        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, Mymsg),
        );
        await firestore()
            .collection('Chats')
            .doc(Route.params.id+Route.params.data.dbUserId)
            .collection('messages')
            .add(Mymsg);
        await firestore()
            .collection('Chats')
            .doc(Route.params.data.dbUserId+Route.params.id)
            .collection('messages')
            .add(Mymsg);
    }, [])


    return (
        <View style={themes}>
            <StatusBar backgroundColor={'#30d5c8'} barStyle={'dark-content'} />
            <View style={styles.HeaderView}>
                <Text style={styles.HeaderText}>{Route.params.data.dbName}</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: Route.params.id,
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    HeaderView:{
        width:Dimensions.get('window').width,
        backgroundColor:'rgba(48, 48, 48,0.7)',
        paddingVertical:10,
        justifyContent:'center',
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
        fontSize:20,
    }
})

export default Chat;