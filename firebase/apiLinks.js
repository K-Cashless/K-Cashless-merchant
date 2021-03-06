const API_URL = {
    SIGN_UP: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/merchantSignUp',
    SIGN_IN: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/merchantLogin',
    SIGN_OUT: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/logout',
    FORGET_PASSWORD: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/resetPass',
    GET_MERCHANT_DATA: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/getMerchantData',
    GET_MERCHANT_TRANSACTION: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/merchant/getOneMerchantTransaction',
    UPLOAD_IMAGE: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/merchant/image',
    UPDATE_MERCHANT_DATA: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/merchant/updateMerchantData',
    REQUEST_MONEY: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/merchant/moneyRequest',
    PUSH_NOTIFICATION_TOKEN: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/merchant/pushMerchantDeviceToken'
};

export default API_URL;