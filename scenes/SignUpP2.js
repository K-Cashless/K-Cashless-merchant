import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NormalTextInput from "../components/NormalTextInput";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import TransparentButton from "../components/TransparentButton";
import API_URL from '../firebase/apiLinks';


const SignUpP2 = ({navigation}) => {
    const [imgUri, setImgUri] = useState('');
    const [info, setInfo] = useState(navigation.getParam('info', {}));
    let errorState = {
        storeName: useState(true),
        ownerName: useState(true),
        phone: useState(true),
    };
    const [allowProceed, setAllowProceed] = useState(false);
    useEffect(() => {
        setAllowProceed(
            errorState.storeName[0] === false &&
            errorState.ownerName[0] === false &&
            errorState.phone[0] === false
        );
    });

    const handleSignUp = () => {
        return new Promise((resolve, reject) => {
            const infoToSend = {
                email: info.email,
                password: info.password,
                confirmPassword: info.confirmPassword,
                handle: "0015",
                storeName: info.storeName,
                ownerName: info.ownerName,
                phone: info.phone,
            };
            console.log(infoToSend);

            axios.post(API_URL.SIGN_UP, infoToSend)
                .then(res => {
                    console.log(res);
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'SignUpComplete'})],
                    });
                    navigation.dispatch(resetAction);
                    resolve();
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error', 'Please Try Again');
                    reject();
                });
        });
    };


    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView>
                    <View style={{marginHorizontal: 20, marginTop: '10%', justifyContent: 'flex-start'}}>
                        <SubScreenHeader title={'Sign Up'} navigation={navigation} backButton={true}/>
                        <View style={{marginTop: 20}}>
                            <NormalTextInput
                                placeholder={'Store Name*'}
                                onChangeText={(text) => setInfo({...info, storeName: text})}
                                value={info.storeName}
                                errorStatus={errorState.storeName}
                                errorRule={[
                                    {pattern: /.+/, message: 'Store Name Must Not Be Empty'},
                                ]}
                            />
                            <NormalTextInput
                                placeholder={'Owner Name*'}
                                onChangeText={(text) => setInfo({...info, ownerName: text})}
                                value={info.ownerName}
                                errorStatus={errorState.ownerName}
                                errorRule={[
                                    {pattern: /.+/, message: 'Owner Name Must Not Be Empty'},
                                ]}
                            />
                            <NormalTextInput
                                placeholder={'Phone*'}
                                onChangeText={(text) => setInfo({...info, phone: text})}
                                value={info.phone}
                                errorStatus={errorState.phone}
                                errorRule={[
                                    {pattern: /.+/, message: 'Phone Number Must Not Be Empty'},
                                    {pattern: /^\d+$/, message: 'Phone Number Must Contains Numbers Only'},
                                ]}
                            />
                        </View>
                        <TransparentButton
                            text={'Sign Up'}
                            disabled={!allowProceed}
                            onPress={handleSignUp}
                            style={{backgroundColor: allowProceed ? 'rgb(38,115,226)' : 'rgb(150,150,150)'}}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </View>
    )
};

const TextButton = ({text, color, onPress}) => {
    return (
        <TouchableOpacity style={{margin: 20}} onPress={onPress}>
            <Text style={[MainStyles.head2Text, {color: color}]}>{text}</Text>
        </TouchableOpacity>
    )
};

const handleImagePicking = async (setImgUri) => {
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permission.status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if (result.cancelled === false) {
            setImgUri(result.uri);
        }
    }
};

export default SignUpP2;