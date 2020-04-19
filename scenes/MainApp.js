import React, {useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomeHeader, QuickActionsGrid} from '../components';
import * as colors from '../styles/Colors';
import store from '../store';
import RedDot from '../components/RedDot';
import AccountQuickSum from '../components/AccountQuickSum';

const HomeScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {

    };
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>

            <View style={{
                top: '5%'
            }}>
                <View style={{marginHorizontal: 20}}>
                    <HomeHeader navigation={navigation}/>
                </View>
                {/*Header*/}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor='white'
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {/*K Point Balance*/}
                    <View style={{marginTop: 20, marginHorizontal: 20}}>
                        <AccountQuickSum User={store.getState().User}/>
                    </View>
                    <View style={{marginTop: 20, marginHorizontal: 20, height: 100}}>
                        <Text style={{
                            fontFamily: 'proxima-bold',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>Recent Activity</Text>
                    </View>
                    {/*Quick Actions*/}
                    <View style={{flex: 1, marginHorizontal: 20}}>
                        <QuickActionsGrid navigation={navigation}/>
                    </View>
                    <View style={{height: 200}}/>
                </ScrollView>
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