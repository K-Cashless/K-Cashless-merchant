import React from 'react';
import {Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomeHeader, QuickActionsGrid} from '../components';
import * as colors from '../styles/Colors';
import store from '../store';
import RedDot from '../components/RedDot';


const AccountSummary = ({User}) => {
    return (
        <View style={{
            backgroundColor: colors.primary,
            width: '100%',
            height: 150,
            borderRadius: 5
        }}>
            <View style={{
                padding: 20,
                borderRadius: 5,
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                <View style={{flex: 3, height: 110, justifyContent: 'flex-start'}}>
                    {/*Sample Data*/}
                    <Text style={{
                        fontFamily: 'proxima-bold',
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                    }}>SHOP NAME</Text>
                    <Text style={{
                        fontFamily: 'proxima-regular',
                        fontSize: 18,
                        color: 'white',
                    }}>{User.firstName} {User.lastName}</Text>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{
                            fontFamily: 'proxima-bold',
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'right'
                        }}>{User.balance.toFixed(2)} {'\u0E3F'}</Text>
                    </View>
                </View>
            </View>
        </View>

    )
};

const HomeScreen = ({navigation}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            {/*Header*/}
            <View style={{
                marginHorizontal: 20,
                top: '5%'
            }}>
                <HomeHeader navigation={navigation}/>
            </View>

            {/*K Point Balance*/}
            <View style={{marginHorizontal: 20, marginTop: '13%'}}>
                <AccountSummary User={store.getState().User}/>
            </View>

            {/*Quick Actions*/}
            <View style={{marginHorizontal: 20, top: '5%'}}>
                <QuickActionsGrid navigation={navigation}/>
            </View>
        </View>
    );
};

const MoreScreen = () => {
    return (
        <View style={MainStyles.container}>
            <Text style={MainStyles.head1Text}>More</Text>
        </View>
    );
};


const MainApp = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: () => ({
                tabBarIcon: ({focused, tintColor}) => {
                    return (
                        <View>
                            <Icon name='home' size={25} color={tintColor}/>
                            <RedDot/>
                        </View>
                    );
                },
            })
        },
        Scan: {
            screen: () => null,
            navigationOptions: () => ({
                tabBarIcon: ({focused, tintColor}) => <Icon name='qrcode' size={25} color={tintColor}/>
            })
        },
        More: {
            screen: MoreScreen,
            navigationOptions: () => ({
                tabBarIcon: ({focused, tintColor}) => <Icon name='dot-circle' size={25} color={tintColor}/>
            })
        },
    },
    {
        tabBarOptions: {
            activeTintColor: colors.primary,
            inactiveTintColor: 'rgba(255,255,255,0.5)',
            showLabel: false,
            labelStyle: {
                fontFamily: 'proxima-regular',
                fontSize: 12
            },
            style: {
                position: 'absolute',
                width: '100%',
                height: 60,
                alignItems: 'center',
                backgroundColor: 'rgb(20,20,20)',
                borderTopColor: "transparent",
            }
        },
    }
);

export default createAppContainer(MainApp);