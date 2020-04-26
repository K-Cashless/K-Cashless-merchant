import React from 'react';
import {Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DoneButton from '../components/DoneButton';

const RequestMoneyComplete = ({navigation}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center'}}>
                <View style={{flex: 1, width: '100%', top: 50}}>
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'hand-holding-usd'} size={100} color={'#2AC062'}/>
                        </View>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 30,
                            width: '100%',
                            textAlign: 'center',
                            flex: 0.5
                        }]}>Request Withdrawal Successful</Text>
                    </View>
                    <Text style={[MainStyles.bodyText, {flex: 1, textAlign: 'center'}]}>Your request has been
                        received.</Text>
                </View>
                <View style={{width: '100%', bottom: 20}}>
                    <DoneButton navigation={navigation}/>
                </View>
            </View>
        </View>
    );
};

export default RequestMoneyComplete;