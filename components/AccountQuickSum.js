import React from 'react';
import {Text, View} from 'react-native';
import * as colors from '../styles/Colors';


const AccountQuickSum = ({User}) => {
    return (
        <View style={{
            backgroundColor: colors.primary,
            width: '100%',
            height: 150,
            borderRadius: 5,
            shadowRadius: 10,
            shadowOpacity: 0.9,
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
                    }}>{User.shopName}</Text>
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

export default AccountQuickSum;