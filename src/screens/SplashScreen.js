import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {

    const backgroundImage = require('../images/project_logo.png');
    // const anim = new Animated.Value(0);
    // const animate = () => {
    //     Animated.timing(anim, {
    //         toValue: 1,
    //         duration: 4000,
    //         easing: Easing.linear
    //     }).start();
    // };

    const opacity = new Animated.Value(0);
    Animated.timing(opacity,{
        toValue: 1,
    })

    useEffect(() => {
        animate('');
    }, [])

    const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 0]
    });

    const translateX = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 0]
    });
    return (
        <View style={styles.screenstyle}>
            {/* <Animated.View style={[styles.circle, { transform: [{ translateX }, { translateY }] }]} /> */}
            <Animated.Image
                source={require('../images/project_logo.png')}
                style={[
                    styles.circle,
                    {
                        transform:
                            [
                                { translateX },
                                { translateY }
                            ]
                    }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenstyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    circle: {
        width: height / 3,
        height: height / 3,
    }
});

export default SplashScreen;