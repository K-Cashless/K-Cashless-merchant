import React from 'react';
import {Text, View} from 'react-native';
import * as colors from '../styles/Colors';
import {connect} from 'react-redux';


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
                    <Text style={{
                        fontFamily: 'proxima-bold',
                        fontSize: 25,
                        color: 'white',
                    }}>{User.storeName}</Text>
                    <Text style={{
                        fontFamily: 'proxima-regular',
                        fontSize: 18,
                        color: 'white',
                    }}>{User.ownerName}</Text>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{
                            fontFamily: 'proxima-bold',
                            fontSize: 25,
                            color: 'white',
                            textAlign: 'right'
                        }}>{User.balance.toFixed(2)} {'\u0E3F'}</Text>
                    </View>
                </View>
            </View>
        </View>

    )
};

function mapStateToProps(state) {
    return ({
        User: state.User
    });
}

export default connect(mapStateToProps)(AccountQuickSum);