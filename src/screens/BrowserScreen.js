import React, { useState} from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const BrowserScreen = ( {navigation} ) => {
    
    const url = 'https://resident.uidai.gov.in/offline-kyc';
    return (
        <View style={{flex:1}}>
            <View style={styles.topnavigation}>
                <TouchableOpacity onPress= {() => navigation.navigate('Instruc')}>
                    {/* <Image style={{marginHorizontal:5,height:40,width:40}} source = {require('../images/3_login/back_btn.png')} /> */}
                </TouchableOpacity>
                <Text style={styles.navtext}>Aadhaar XML</Text>
                
            </View>
            <WebView 
                source={{uri: url}}
            />
        </View>
    );
};

const styles=StyleSheet.create({
    screenstyle:{
        flex: 1
    },
    topnavigation:{
        backgroundColor: '#74b94f',
        height: 60,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    navtext:{
        height: 60,
        width: '80%',
        paddingLeft:20,
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#363636'
    },
    otp:{
        alignItems:'center',
        padding:10,
        justifyContent: 'space-around'
    },
    textinput:{
        marginVertical:10,
        padding: 10,
        height: 50,
        width: 350,
        borderColor: 'gray',
        borderWidth: 2,
        color: '#424242',
        fontSize: 20
    }
});

export default BrowserScreen;