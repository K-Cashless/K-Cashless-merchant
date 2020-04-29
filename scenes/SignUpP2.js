import React, {useEffect, useState} from 'react';
import {Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NormalTextInput from "../components/NormalTextInput";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as color from '../styles/Colors';
import TransparentButton from "../components/TransparentButton";

const SignUpP2 = ({navigation}) => {
    const [imgUri, setImgUri] = useState(null);
    const [info, setInfo] = useState(navigation.getParam('info', {}));
    let errorState = {
        shopName: useState(true),
        firstName: useState(true),
        lastName: useState(true),
        phone: useState(true),
    };
    const [allowProceed, setAllowProceed] = useState(false);
    useEffect(() => {
        setAllowProceed(
            errorState.firstName[0] === false &&
            errorState.lastName[0] === false &&
            errorState.phone[0] === false
        );
    });

    const handleSignUp = () => {
        return new Promise((resolve, reject) => {
            const infoToSend = {
                email: info.email,
                password: info.password,
                confirmPassword: info.confirmPassword,
                handle: info.studentID,
                firstName: info.firstName,
                lastName: info.lastName,
                phone: info.phone
            };
            console.log(infoToSend);

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'SignUpComplete'})],
            });
            navigation.dispatch(resetAction);
            resolve();

            // axios.post(API_URL.SIGN_UP, infoToSend)
            //     .then(res => {
            //         console.log(res);
            //         const resetAction = StackActions.reset({
            //             index: 0,
            //             actions: [NavigationActions.navigate({routeName: 'SignUpComplete'})],
            //         });
            //         navigation.dispatch(resetAction);
            //         resolve();
            //     })
            //     .catch(error => {
            //         console.log(error.response.data.message);
            //         Alert.alert('Error', error.response.data.message);
            //         reject();
            //     });
        });
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{marginHorizontal: 20, top: '5%', justifyContent: 'flex-end'}}>
                    <SubScreenHeader title={'Sign Up'} navigation={navigation} backButton={true}/>
                    <KeyboardAwareScrollView>
                        <View style={{marginTop: 20}}>
                            <View style={{marginTop: 20, alignItems: 'center'}}>
                                <View style={{width: 100, height: 100, borderRadius: 100, backgroundColor: 'white'}}>
                                    {
                                        imgUri &&
                                        <Image source={{uri: imgUri}}
                                               style={{width: 100, height: 100, borderRadius: 100}}
                                               resizeMode='cover'/>
                                    }
                                </View>
                                <TextButton text={'Add Your Photo'} color={color.primary}
                                            onPress={() => handleImagePicking(setImgUri)}/>
                            </View>


                            <NormalTextInput
                                placeholder={'Shop Name*'}
                                onChangeText={(text) => setInfo({...info, shopName: text})}
                                value={info.shopName}
                                errorStatus={errorState.shopName}
                                errorRule={[
                                    {pattern: /.+/, message: 'Shop Name Must Not Be Empty'},
                                ]}
                            />

                            <NormalTextInput
                                placeholder={'First Name*'}
                                onChangeText={(text) => setInfo({...info, firstName: text})}
                                value={info.firstName}
                                errorStatus={errorState.firstName}
                                errorRule={[
                                    {pattern: /.+/, message: 'First Name Must Not Be Empty'},
                                ]}
                            />

                            <NormalTextInput
                                placeholder={'Last Name*'}
                                onChangeText={(text) => setInfo({...info, lastName: text})}
                                value={info.lastName}
                                errorStatus={errorState.lastName}
                                errorRule={[
                                    {pattern: /.+/, message: 'Last Name Must Not Be Empty'},
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
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </TouchableWithoutFeedback>
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