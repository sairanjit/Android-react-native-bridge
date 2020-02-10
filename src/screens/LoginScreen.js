import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DBServices from '../realm/DBServices';
import { Base64 } from 'js-base64';

const LoginScreen = ({ navigation }) => {
    const [logo, setLogo] = useState(false);
    const [walletname, setwalletname] = useState('');
    const [password, setpassword] = useState('');
    const [showErrorMessage, setErrorMsg] = useState('');
    const [check, setcheck] = useState(true);

    const validate_field = () => {
        if (walletname === "" && password === "") {
            setErrorMsg(showErrorMessage => "Enter wallet name and password");
            setcheck(check => true);
        }
        else if (walletname === "") {
            setErrorMsg(showErrorMessage => "Enter wallet name");
            setcheck(check => true);
        }
        else if (password === "") {
            setErrorMsg(showErrorMessage => "Enter password");
            setcheck(check => true);
        }
        else {
            const signupdb = DBServices.fetchUserDB();
            let logincheck = {
                walletName: walletname,
                password: password,
            };
            let loginsave = {
                walletName: walletname,
                password: Base64.encode(password),
            };
            let flag = 0;
            signupdb.map((item, index) => {
                if (item.walletName === logincheck.walletName && Base64.decode(item.password) === logincheck.password) {
                    setcheck(check => false);
                    navigation.navigate('Instruc');
                    DBServices.saveLoginInfo(loginsave);
                    DBServices.fetchLoginDB();
                    flag = 1;
                    return;
                }
            });
            if (flag === 0) {
                setErrorMsg(showErrorMessage => 'Enter valid credentials');
            }
        }
    };

    return (
        <View style={styles.screenstyle}>
            <View style={styles.topnavigation}>
                <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                    <FontAwesome
                        style={{ alignSelf: 'center', marginHorizontal: 10 }}
                        size={50}
                        color='white' name="angle-left" />
                </TouchableOpacity>
                <Text style={styles.navtext}>Login</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.logoview}>
                    <Image style source={require('../images/project_logo.png')} />
                </View>
                <View style={styles.user}>
                    <TextInput style={styles.textinput}
                        placeholder='Wallet name'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text) => setwalletname(walletname => text)}
                    />
                    <TextInput style={styles.textinput}
                        placeholder='Wallet Password'
                        onChangeText={(text) => setpassword(password => text)}
                        secureTextEntry
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    {check ?
                        (
                            <Text style={{ color: 'red', fontSize: 18 }}>{showErrorMessage}</Text>
                        ) : (
                            null
                        )
                    }
                </View>
                {/* <View style={{flexDirection:'row', alignItems:'center',marginLeft:15,marginTop:-20}}>
                <TouchableOpacity onPress={() => setLogo(logo => ! logo)}>
                    {logo ?
                    (
                        <Image style={styles.checkbox} source = {require('../images/3_login/checkbox_regular.png')} />
                    ) : (
                        <Image style={styles.checkbox} source = {require('../images/3_login/checkbox_pressed.png')} />
                    )
                    } 
                </TouchableOpacity>
                <Text style={{color:'#003B46', alignSelf:'center',marginLeft:-10}}> Remember Password </Text>
                </View>  */}
                <TouchableOpacity >
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ alignSelf: 'center', marginVertical: 20, color: '#003B46' }}>forgot  password ?</Text>
                    </View>
                </TouchableOpacity >
                <TouchableOpacity
                    onPress={() => validate_field()}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 300, height: 60, borderRadius: 50, backgroundColor: '#003B46' }}>
                            <Text style={{ alignSelf: 'center', top: 20, fontSize: 18, color: 'white' }}>Open wallet</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ paddingTop: 10, color: 'green', alignSelf: 'center', fontSize: 20 }}>Create Account</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screenstyle: {
        flex: 1
    },
    topnavigation: {
        backgroundColor: '#003B46',
        height: 60,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    navtext: {
        height: 60,
        width: '80%',
        padding: 10,
        textAlignVertical: 'center',
        fontSize: 20,
        color: 'white'
    },
    icon: {
        marginHorizontal: 10,
        width: 30,
        height: 30,
        borderWidth: 5
    },
    logoview: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        alignSelf: 'center',
        width: 250,
        height: 60
    },
    user: {
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-around'
    },
    textinput: {
        marginVertical: 10,
        padding: 10,
        height: 50,
        width: 350,
        borderColor: 'gray',
        borderWidth: 2,
        color: '#424242',
        fontSize: 18,
        borderRadius: 50,
        borderColor: '#003B46'
    },
    checkbox: {
        marginHorizontal: 21,
        marginVertical: 20,
        alignSelf: 'flex-start',
        height: 40,
        width: 30,
        overlayColor: '#003B46'
    }

});

export default LoginScreen;