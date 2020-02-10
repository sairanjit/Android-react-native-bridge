import React, { useState } from 'react';
import { View, Text, StyleSheet, NativeModules, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>From android</Text>
            <TouchableOpacity onPress={() =>
                NativeModules.ToastExample.show('hello from android react-native',
                    (err) => {
                        alert(err);
                    },
                    (message) => {
                        alert(message);
                    })}>
                <Text style={{ fontSize: 20 }}>Press</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;