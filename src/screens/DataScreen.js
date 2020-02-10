import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { parseString } from 'react-native-xml2js';
import { FlatList } from 'react-native-gesture-handler';
import * as ZipMethods from 'react-native-zip-archive';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';


const xml2js = require('react-native-xml2js');
var parser = new xml2js.Parser();
let dirs = RNFetchBlob.fs.dirs;


const DataScreen = ({ navigation }) => {

    const [sourcePath, setPath] = useState('');

    unzipMyZipFile = () => {
        console.log('inside unzip method');
        ZipMethods.isPasswordProtected(sourcePath)
            .then((yes) => {
                console.log(yes);
            })
            .catch((err) => {
                console.log('IsPassP', err);
            })
        // ZipMethods.unzipWithPassword(sourcePath, RNFetchBlob.fs.DocumentDir, '1111')
        //     .then((path) => {
        //         console.log(`unzip completed at ${path}`)
        //     })
        //     .catch((error) => {
        //         console.log("Error", error)
        //     })
    };

    const docs = async () => {
        console.log('1')
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log("Res uri",
                res
            );

            console.log('2')
            // console.log(unzipWithPassword)

            RNFetchBlob.fs.stat(res.uri)
                .then((stats) => {
                    const dirs = RNFetchBlob.fs.dirs;
                    console.log('3')

                    console.log(stats);
                    const sourcepath = stats.path;
                    console.log(sourcepath)
                    setPath(sourcePath => stats.path)
                    const targetpath = dirs.DocumentDir;
                    //console.log(targetpath);
                    const password = '1111';
                    // password
                    //   unzipMyZipFile();
                    ZipMethods.unzipWithPassword(sourcepath, targetpath, '1111')
                        .then((path) => {
                            console.log(`unzip completed at ${targetpath}/${path}`)
                            RNFetchBlob.fs.readFile(`${targetpath}/${path}`)
                                .then((data) => {
                                    parser.parseString(data, (err, result) => {
                                        if (result) {
                                            console.log(result.OfflinePaperlessKyc);
                                            const info = (result) => {
                                                return (
                                                    result.OfflinePaperlessKyc
                                                );
                                            };
                                            JSON.stringify(result);

                                            // this.saveValues(result.OfflinePaperlessKyc);
                                        }
                                        else {
                                            ToastAndroid.show('Something went wrong, please try again', ToastAndroid.SHORT);
                                        }
                                    });
                                })
                        })
                        .catch((error) => {
                            console.log("Errorss", error)
                        })
                })
                .catch((err) => {
                    console.log('Error', err)
                })
        } catch (err) {
            // if (DocumentPicker.isCancel(err)) {
            console.log("Document not uploaded");
            // } else {
            //     throw err;
            // }
        }
    };

    return (
        <View style={styles.screenstyle}>
            <View style={styles.topnavigation}>
                <Text style={styles.navtext}>Data</Text>
            </View>
            <View style={{ borderRadius: 50, marginTop: 10, width: 300, height: 70, alignSelf: 'center', justifyContent: 'center', backgroundColor: '#003B46' }}>
                <TouchableOpacity onPress={() => docs()}>
                    <Text style={{ alignSelf: 'center', fontSize: 24, color: 'white' }}>Extract</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 540, width: '100%' }}>
                <Image style={{ height: 540, width: '100%' }} source={require('../images/Aadhar_Temp.jpg')} />
            </View>
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
    },
    otp: {
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
        fontSize: 20,
        alignSelf: 'center'
    }
});

export default DataScreen;