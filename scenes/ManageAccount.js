import React, {useRef, useState} from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import SubScreenHeader from "../components/SubScreenHeader";
import MInfoSection from '../components/MInfoSection';
import MainStyles from '../styles/MainStyles';
import {connect} from 'react-redux';
import * as color from '../styles/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BallIndicator} from "react-native-indicators";
import NormalTextInput from "../components/NormalTextInput";
import TransparentButton from "../components/TransparentButton";
import axios from 'axios';
import API_URL from '../firebase/apiLinks';
import * as actions from "../actions";
import store from '../store';


const ManageAccount = ({navigation, User}) => {
    const refRBSheet = useRef();
    const [showLoading, setShowLoading] = useState(false);
    const [editedField, setEditedField] = useState(null);
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <KeyboardAwareScrollView>
                <View style={{marginHorizontal: 20, top: 0, justifyContent: 'flex-end'}}>
                    <View style={{marginTop: '10%', width: '100%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <SubScreenHeader navigation={navigation} title={'Manage Account'} backButton={true}/>
                            {
                                showLoading ? (
                                    <View style={{position: 'absolute', right: 0, alignSelf: 'center'}}>
                                        <BallIndicator size={20} color={'white'}/>
                                    </View>
                                ) : null
                            }
                        </View>


                        <View style={{marginTop: 20, alignItems: 'center'}}>
                            <View style={{width: 100, height: 100, borderRadius: 100, backgroundColor: 'white'}}>
                                {
                                    User.pic &&
                                    <Image source={{uri: User.pic}}
                                           style={{width: 100, height: 100, borderRadius: 100}}
                                           resizeMode='cover'/>
                                }
                            </View>

                            <View style={{margin: 20}}>
                                <TextButton text={'Edit'} color={color.primary}
                                            onPress={() => handleImagePicking(User.token, setShowLoading)}/>
                            </View>
                        </View>


                        <UserInfo title={'Username'} value={User.id} refRBSheet={refRBSheet}
                                  setEditedField={setEditedField} editable={false}/>
                        <UserInfo title={'Email'} value={User.email} refRBSheet={refRBSheet}
                                  setEditedField={setEditedField} editable={false}/>
                        <UserInfo title={'Store Name'} value={User.storeName} refRBSheet={refRBSheet}
                                  setEditedField={setEditedField}/>
                        <UserInfo title={'Owner Name'} value={User.ownerName} refRBSheet={refRBSheet}
                                  setEditedField={setEditedField}/>
                        <UserInfo title={'Phone'} value={User.phone} refRBSheet={refRBSheet}
                                  setEditedField={setEditedField}/>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <RBSheet
                ref={refRBSheet}
                animationType={'fade'}
                duration={200}
                height={250}
                closeOnDragDown={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    },
                    container: {
                        backgroundColor: color.background,
                    },
                    draggableIcon: {
                        backgroundColor: 'white'
                    }
                }}
            >
                {/*<TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>*/}
                <EditingSheet editedField={editedField} refRBSheet={refRBSheet}/>
                {/*</TouchableWithoutFeedback>*/}
            </RBSheet>
        </View>
    )
};

const EditingSheet = ({editedField, refRBSheet}) => {
    const [field, setField] = useState('');
    const errorState = useState(true);

    const handleStoreNameUpdate = async () => {
        return new Promise(async (resolve, reject) => {
            let infoToSend = null;
            await axios.get(API_URL.GET_MERCHANT_DATA, {'headers': {'Authorization': 'Mearer ' + store.getState().User.token}})
                .then(res => {
                    // Update User Data
                    store.dispatch(actions.User.setId(res.data[0].handle));
                    store.dispatch(actions.User.setStoreName(res.data[0].storeName));
                    store.dispatch(actions.User.setOwnerName(res.data[0].ownerName));
                    store.dispatch(actions.User.setBalance(res.data[0].total));
                    store.dispatch(actions.User.setEmail(res.data[0].email));
                    store.dispatch(actions.User.setPhone(res.data[0].phone));
                    store.dispatch(actions.User.setPic(res.data[0].imageUrl));

                    const tempInfo = res.data[0];
                    infoToSend = {
                        storeName: field,
                        ownerName: tempInfo.ownerName,
                        phone: tempInfo.phone,
                    }
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
            await console.log(infoToSend);

            await axios.post(API_URL.UPDATE_MERCHANT_DATA, infoToSend, {
                'headers': {
                    'Authorization': 'Mearer ' + store.getState().User.token
                }
            })
                .then(() => {
                    store.dispatch(actions.User.setStoreName(field));
                    refRBSheet.current.close();
                    resolve();
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
        });
    };
    const handleOwnerNameUpdate = async () => {
        return new Promise(async (resolve, reject) => {
            let infoToSend = null;
            await axios.get(API_URL.GET_MERCHANT_DATA, {'headers': {'Authorization': 'Mearer ' + store.getState().User.token}})
                .then(res => {
                    // Update User Data
                    store.dispatch(actions.User.setId(res.data[0].handle));
                    store.dispatch(actions.User.setStoreName(res.data[0].storeName));
                    store.dispatch(actions.User.setOwnerName(res.data[0].ownerName));
                    store.dispatch(actions.User.setBalance(res.data[0].total));
                    store.dispatch(actions.User.setEmail(res.data[0].email));
                    store.dispatch(actions.User.setPhone(res.data[0].phone));
                    store.dispatch(actions.User.setPic(res.data[0].imageUrl));

                    const tempInfo = res.data[0];
                    infoToSend = {
                        storeName: tempInfo.storeName,
                        ownerName: field,
                        phone: tempInfo.phone,
                    }
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
            await console.log(infoToSend);

            await axios.post(API_URL.UPDATE_MERCHANT_DATA, infoToSend, {
                'headers': {
                    'Authorization': 'Mearer ' + store.getState().User.token
                }
            })
                .then(() => {
                    store.dispatch(actions.User.setOwnerName(field));
                    refRBSheet.current.close();
                    resolve();
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
        });
    };

    const handlePhoneUpdate = async () => {
        return new Promise(async (resolve, reject) => {
            let infoToSend = null;
            await axios.get(API_URL.GET_MERCHANT_DATA, {'headers': {'Authorization': 'Mearer ' + store.getState().User.token}})
                .then(res => {
                    // Update User Data
                    store.dispatch(actions.User.setId(res.data[0].handle));
                    store.dispatch(actions.User.setStoreName(res.data[0].storeName));
                    store.dispatch(actions.User.setOwnerName(res.data[0].ownerName));
                    store.dispatch(actions.User.setBalance(res.data[0].total));
                    store.dispatch(actions.User.setEmail(res.data[0].email));
                    store.dispatch(actions.User.setPhone(res.data[0].phone));
                    store.dispatch(actions.User.setPic(res.data[0].imageUrl));

                    const tempInfo = res.data[0];
                    infoToSend = {
                        storeName: tempInfo.storeName,
                        ownerName: tempInfo.ownerName,
                        phone: field,
                    }
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
            await console.log(infoToSend);

            await axios.post(API_URL.UPDATE_MERCHANT_DATA, infoToSend, {
                'headers': {
                    'Authorization': 'Mearer ' + store.getState().User.token
                }
            })
                .then(() => {
                    store.dispatch(actions.User.setPhone(field));
                    refRBSheet.current.close();
                    resolve();
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
        });
    };

    switch (editedField) {
        case 'Store Name':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Store Name</Text>
                    <NormalTextInput
                        placeholder={'Enter your store name*'}
                        onChangeText={(text) => setField(text)}
                        value={field}
                        errorStatus={errorState}
                        errorRule={[
                            {pattern: /.+/, message: 'Store Name Must Not Be Empty'},
                        ]}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                            <Text style={[MainStyles.bodyText, {
                                fontFamily: 'proxima-bold',
                                color: 'red',
                                marginTop: 20,
                                right: 25
                            }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TransparentButton
                            text={'Done'}
                            disabled={errorState[0]}
                            style={{backgroundColor: errorState[0] ? 'rgba(150,150,150,0.5)' : 'rgb(38,115,226)'}}
                            onPress={handleStoreNameUpdate}
                        />
                    </View>
                </View>
            );
        case 'Owner Name':
            return (

                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Last Name</Text>
                    <NormalTextInput
                        placeholder={'Enter your last name*'}
                        onChangeText={(text) => setField(text)}
                        value={field}
                        errorStatus={errorState}
                        errorRule={[
                            {pattern: /.+/, message: 'Last Name Must Not Be Empty'},
                        ]}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                            <Text style={[MainStyles.bodyText, {
                                fontFamily: 'proxima-bold',
                                color: 'red',
                                marginTop: 20,
                                right: 25
                            }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TransparentButton
                            text={'Done'}
                            disabled={errorState[0]}
                            style={{backgroundColor: errorState[0] ? 'rgb(150,150,150)' : 'rgb(38,115,226)'}}
                            onPress={handleOwnerNameUpdate}
                        />
                    </View>
                </View>
            );
        case 'Phone':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Phone</Text>
                    <NormalTextInput
                        placeholder={'Enter your new phone number*'}
                        onChangeText={(text) => setField(text)}
                        value={field}
                        errorStatus={errorState}
                        errorRule={[
                            {pattern: /.+/, message: 'Phone Number Must Not Be Empty'},
                            {pattern: /^\d+$/, message: 'Phone Number Must Contains Numbers Only'},
                        ]}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                            <Text style={[MainStyles.bodyText, {
                                fontFamily: 'proxima-bold',
                                color: 'red',
                                marginTop: 20,
                                right: 25
                            }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TransparentButton
                            text={'Done'}
                            disabled={errorState[0]}
                            style={{backgroundColor: errorState[0] ? 'rgb(150,150,150)' : 'rgb(38,115,226)'}}
                            onPress={handlePhoneUpdate}
                        />
                    </View>
                </View>
            );
        default:
            return null;
    }
};

const UserInfo = ({title, value, setEditedField, refRBSheet, editable = true}) => {
    return (
        <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{flex: 1}}>
                    <MInfoSection title={title} value={value}/>
                </View>
                <View style={{justifyContent: 'center'}}>
                    {
                        editable ?
                            <TextButton
                                text='Edit'
                                color={color.primary}
                                onPress={() => {
                                    setEditedField(title);
                                    refRBSheet.current.open();
                                }}/> : null
                    }

                </View>
            </View>
        </View>
    )
};

const TextButton = ({text, color, onPress}) => {
    return (
        <TouchableOpacity style={{}} onPress={onPress}>
            <Text style={[MainStyles.head2Text, {fontSize: 16, color: color}]}>{text}</Text>
        </TouchableOpacity>
    )
};

const handleImagePicking = async (token, setShowLoading) => {
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permission.status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if (result.cancelled === false) {
            let infoToSend = new FormData();
            const imgUri = result.uri;
            infoToSend.append('image', {
                uri: imgUri,
                name: 'userProfile.jpg',
                type: 'image/jpg'
            });
            console.log("uploading: ", infoToSend);
            // setShowLoading(true);
            // axios.post(API_URL.UPLOAD_IMAGE, infoToSend, {
            //     'headers': {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': 'Bearer ' + token
            //     }
            // })
            //     .then(res => {
            //         setShowLoading(false);
            //         console.log(res);
            //         store.dispatch(actions.User.setPic(result.uri));
            //     })
            //     .catch(error => {
            //         setShowLoading(false);
            //         Alert.alert('Error Changing Your Picture');
            //         console.log(error.response);
            //     });
        }
    }
};

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(ManageAccount);