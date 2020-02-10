import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DBServices from '../realm/DBServices';
import { Base64 } from 'js-base64';

const SignupScreen = ({ navigation }) => {

    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [walletname, setwalletname] = useState('');
    const [mobileno, setmobileno] = useState('');
    const [showErrorMessage, setErrorMsg] = useState('');
    const [check, setcheck] = useState(true);

    const validate_field = () => {
        if (walletname == "" || mobileno == "" || password == "" || confirmpassword == "") {
            setErrorMsg(showErrorMessage => "Enter All details");
            setcheck(check => true);
        }
        else if (password !== confirmpassword) {
            setErrorMsg(showErrorMessage => "password mismatch");
            setcheck(check => true);
        }
        else {
            navigation.navigate('Login');
            let signupsave = {
                walletName: walletname,
                mobile: mobileno,
                password: Base64.encode(password)
            }
            DBServices.saveUserInfo(signupsave);
            DBServices.fetchUserDB();
        }
    };
    return (
        <View style={styles.screenstyle}>
            <View style={styles.topnavigation}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <FontAwesome
                        style={{ alignSelf: 'center', marginHorizontal: 10 }}
                        size={50}
                        color='white' name="angle-left" />
                </TouchableOpacity>
                <Text style={styles.navtext}>Sign Up</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: 20 }}>
                    <View style={styles.categoryview}>

                    </View>
                    <View style={styles.detail}>
                        <TextInput style={styles.textinput}
                            placeholder='Wallet Name'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(text) => setwalletname(walletname => text)}
                        />
                    </View>

                    <View style={styles.detail}>
                        <TextInput style={styles.textinput}
                            placeholder='Mobile Number'
                            autoCorrect={false}
                            keyboardType={'numeric'}
                            maxLength={11}
                            onChangeText={(text) => setmobileno(mobileno => text)}
                        />
                    </View>
                    <View style={{ marginTop: -5, marginLeft: 15 }}>
                        <Text style={{ paddingLeft: 20, paddingBottom: 10, color: '#003B46' }}>We are going to send OTP to this number</Text>
                    </View>
                    <View style={styles.detail}>
                        <TextInput style={styles.textinput}
                            placeholder='Password'
                            secureTextEntry
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(text) => setpassword(password => text)}
                        />
                    </View>
                    <View style={styles.detail}>
                        <TextInput style={styles.textinput}
                            placeholder='Confirm Password'
                            onChangeText={(text) => setconfirmpassword(confirmpassword => text)}
                            secureTextEntry
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                        {check ?
                            (
                                <Text style={{ fontSize: 18, color: 'red' }}>{showErrorMessage}</Text>
                            ) : (
                                null
                            )

                        }
                    </View>
                </View>
                <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ width: 300, height: 60, borderRadius: 50, backgroundColor: '#003B46' }} onPress={() => validate_field()}>
                        <View style={{}}>
                            <Text style={{ alignSelf: 'center', top: 20, fontSize: 18, color: 'white' }}>Create Wallet</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        alignSelf: 'center'
    },
    detail: {
        alignItems: 'center',
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
        borderRadius: 50,
        borderColor: '#003B46'
    }

});

export default SignupScreen;