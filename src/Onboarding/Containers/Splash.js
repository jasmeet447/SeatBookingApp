import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashComponent from '../Components/SplashComponent';

class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.navigateToDashboardIfUserLoggedIn();
        }, 1000);
    }

    navigateToDashboardIfUserLoggedIn = async () => {
        this.setState({ isLoading: true });
        try {
            const email = await AsyncStorage.getItem('email');
            const user = await AsyncStorage.getItem('user');
            const userJsonValue = JSON.parse(user)
            this.setState({ isLoading: false });
            if (userJsonValue != null) {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'SeatSelection', params: {email, user: userJsonValue}}],
                });
            } else {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignIn' }],
                });
            }
        } catch (error) {
            this.setState({ isLoading: false });
            console.log('navigateToDashboardIfUserLoggedIn===>', error);
        }
    }

    render() {
        return (
            <SplashComponent
            />
        );
    }
}


export default Splash;