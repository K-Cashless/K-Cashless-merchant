import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from '../components/SubScreenHeader';
import LInfoSectionTHB from '../components/LInfoSectionTHB';
import BlueButton from "../components/BlueButton";
import {connect} from 'react-redux';
import NumberTextInput from "../components/NumberTextInput";
import store from '../store';
import axios from 'axios';
import API_URL from "../firebase/apiLinks";

const RequestMoney = ({navigation, balance}) => {
    const [amt, setAmt] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [payValueError, setPayValueError] = useState('');

    useEffect(() => {
        if ((!(/^[0-9]*\.[0-9]{2}$/.test(amt)) || amt > store.getState().User.balance || amt <= 0) && isChanged) {
            setPayValueError('Please Enter the Correct Amount and Correct Format (i.e. 25.00)');
        } else {
            setPayValueError('');
        }
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{
                    marginHorizontal: 20,
                    top: '5%',
                    height: '100%',
                }}>
                    <SubScreenHeader navigation={navigation} title={'Request Withdrawal'} backButton={true}/>
                    <View style={{paddingTop: 20, paddingBottom: 50}}>
                        <LInfoSectionTHB title={'YOUR CURRENT BALANCE IS'} value={balance}/>
                    </View>
                    <Text style={MainStyles.bodyText}>Please enter amount to withdraw</Text>
                    <NumberTextInput
                        onChangeText={(text) => {
                            setIsChanged(true);
                            setAmt(text);
                        }}
                        value={amt}
                        placeholder={'Enter amount to pay'}
                        error={payValueError}
                        onBlur={() => setAmt((Math.floor(amt * 1)).toFixed(2))}
                    />
                    <Text style={[MainStyles.bodyText, {marginTop: 5, color: 'red', fontSize: 15}]}>
                        {payValueError}
                    </Text>
                    <BlueButton text={'Make Request'} onPress={() => {
                        return new Promise((resolve, reject) => {
                            axios.post(API_URL.REQUEST_MONEY, {amount: amt}, {'headers': {'Authorization': 'Merchant ' + store.getState().User.token}})
                                .then(res => {
                                    console.log(res);
                                    navigation.replace('RequestMoneyComplete');
                                    resolve();
                                })
                                .catch(error => {
                                    console.log(error.response);
                                    Alert.alert('Error Requesting Withdrawal', error.response.data.message || 'Please Try Again Later');
                                    reject();
                                })

                        });
                    }} disable={payValueError.length !== 0 || !isChanged}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

function mapStateToProps(state) {
    return {
        balance: state.User.balance
    }
}

export default connect(mapStateToProps)(RequestMoney);