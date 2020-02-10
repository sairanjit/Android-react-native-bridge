import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import InstrucScreen from './src/screens/InstrucScreen';
import BrowserScreen from './src/screens/BrowserScreen';
import DataScreen from './src/screens/DataScreen';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';

const navigator = createStackNavigator(
    {
        Splash: {
            screen: SplashScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        Signup: {
            screen: SignupScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        Instruc: {
            screen: InstrucScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        Browser: {
            screen: BrowserScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        Data: {
            screen: DataScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        Home:{
            screen:HomeScreen,
            navigationOptions:{
                headerShown:false
            }
        }
    },
    {
        initialRouteName: 'Home'
    }
);

const App = createAppContainer(navigator);

export default App;