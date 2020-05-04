import React, {useState} from 'react';
import {Alert, Dimensions, RefreshControl, ScrollView, Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomeHeader, QuickActionsGrid} from '../components';
import * as colors from '../styles/Colors';
import store from '../store';
import RedDot from '../components/RedDot';
import AccountQuickSum from '../components/AccountQuickSum';
import SubScreenHeader from "../components/SubScreenHeader";
import QRCode from 'react-native-qrcode-svg';
import MInfoSection from "../components/MInfoSection";
import RecentActivity from '../components/RecentActivity';
import {getAllUserData} from "../firebase/functions";

const HomeScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(false);
        getAllUserData()
            .then(() => setRefreshing(false))
            .catch(error => {
                console.log(error.response);
                Alert.alert('Error Updating Your Info', '');
            });
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
                    <View style={{marginTop: 20, marginHorizontal: 20}}>
                        <AccountQuickSum/>
                    </View>
                    <View style={{marginTop: 20, marginHorizontal: 20, height: 100}}>
                        <RecentActivity/>
                    </View>
                    {/*Quick Actions*/}
                    <View style={{
                        flex: 1,
                        marginHorizontal: 20,
                        justifyContent: 'center',
                        height: Dimensions.get('window').height / 4
                    }}>
                        <QuickActionsGrid navigation={navigation}/>
                    </View>
                    <View style={{height: 200}}/>
                </ScrollView>
            </View>
        </View>
    );
};

const MyQRScreen = () => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{
                top: '5%',
                marginHorizontal: 20,
            }}>
                <SubScreenHeader title={"My QR"} backButton={false}/>
                <View style={{
                    marginTop: 30,
                    width: '100%',
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    <MInfoSection title={'STORE NAME'} value={store.getState().User.storeName}/>
                    <View style={{height: 20}}/>
                    <MInfoSection title={'MERCHANT ID'} value={store.getState().User.id}/>
                    <View style={{
                        alignSelf: 'center',
                        marginTop: 50,
                        height: 300,
                        width: 300,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <QRCode value={store.getState().User.id} size={250}/>
                    </View>
                </View>
            </View>
        </View>
    )
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
        MyQR: {
            screen: MyQRScreen,
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