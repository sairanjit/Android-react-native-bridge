import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, ImageBackground, TouchableOpacity, Picker, ToastAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';


const InstrucScreen = ({ navigation }) => {
    const [logo, setLogo] = useState(false);
    const [isuploaded, setstatus] = useState(false);
    const url = 'https://resident.uidai.gov.in/offline-kyc';

    const browser = () => {
        Linking.openURL(url).catch(err => console.error('An error occurred', err))
    };

    const doc = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(
                res
            );
            setstatus(isuploaded => true);
            ToastAndroid.show('Uploaded', ToastAndroid.LONG);
        } catch (err) {
            setstatus(isuploaded => false);
            if (DocumentPicker.isCancel(err)) {
                console.log("Document not uploaded");
                // ToastAndroid.show('not uploaded', ToastAndroid.LONG);
            } else {
                throw err;
            }
        }
    };
    return (
        <View style={styles.screenstyle}>
            <View style={styles.topnavigation}>
                <Text style={styles.navtext}>Verification</Text>
            </View>
            <View style={{ width: 350, height: 200, alignSelf: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'black' }}>
                    Please follow the instructions given below
                </Text>
            </View>
            <View style={styles.otp}>

            </View>
            <TouchableOpacity
                onPress={() => browser()}
            // onPress={() => navigation.navigate('Browser')}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 300, height: 60, backgroundColor: '#003B46', borderRadius: 50 }}>
                        <Text style={{ alignSelf: 'center', top: 15, fontSize: 24, color: 'white' }}>Proceed</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>If You have xml file please upload below</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ height: 60, width: 300, top: 15, backgroundColor: '#003B46', borderRadius: 50 }}
                    onPress={() => doc()}>
                    <Text style={{ color: 'white', top: 15, fontSize: 24, alignSelf: 'center' }}>Upload</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 70, width: '100%', top: 15, alignItems: 'center', justifyContent: 'center' }}>
                {isuploaded ?
                    (
                        <View style={{marginTop:40, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20 }}> Document Uploaded</Text>
                            <TouchableOpacity
                                style={{ height: 60, width: 300, top: 15, backgroundColor: '#003B46', borderRadius: 50 }}
                                onPress={() => navigation.navigate('Data')}
                            >
                                <Text style={{ color: 'white', top: 15, fontSize: 24, alignSelf: 'center' }}>Next</Text>
                            </TouchableOpacity>
                        </View>
                        // <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20 }}> Document Uploaded</Text>
                    ) : (
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>Document not Uploaded</Text>
                    )
                }
            </View>
            {/* <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                <TouchableOpacity 
                    style={{height:60,width:300,top:15,backgroundColor:'#003B46', borderRadius:50}}
                    onPress={() => navigation.navigate('Data')}
                    >
                    <Text style={{color:'white',top:15 ,fontSize:24, alignSelf:'center'}}>Next</Text>
                </TouchableOpacity>
            </View> */}
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
        paddingLeft: 20,
        textAlignVertical: 'center',
        fontSize: 24,
        color: 'white'
    }

});

export default InstrucScreen;