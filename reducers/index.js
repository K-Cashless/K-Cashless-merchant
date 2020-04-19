import * as actionType from '../constants/action-const';

export const initialState = {
    User: {
        id: null,
        pic: null,
        shopName: null,
        firstName: null,
        lastName: null,
        name: '(initialState.name)FIX IT IF YOU SEE THIS MESSAGE!!!!',
        balance: 0,
        kpoints: 0,
        notifications: {
            haveUnread: false,
            list: []
        },
        history: []
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_USER_ID:
            return {
                ...state,
                User: {
                    ...state.User,
                    id: action.payload
                }
            };
        case actionType.SET_USER_PIC:
            return {
                ...state,
                User: {
                    ...state.User,
                    pic: action.payload
                }
            };
        case actionType.SET_USER_SHOP_NAME:
            return {
                ...state,
                User: {
                    ...state.User,
                    shopName: action.payload
                }
            };
        case actionType.SET_USER_FIRST_NAME:
            return {
                ...state,
                User: {
                    ...state.User,
                    firstName: action.payload
                }
            };
        case actionType.SET_USER_LAST_NAME:
            return {
                ...state,
                User: {
                    ...state.User,
                    lastName: action.payload
                }
            };

        case actionType.SET_USER_NAME:
            return {
                ...state,
                User: {
                    ...state.User,
                    name: action.payload
                }
            };

        case actionType.SET_USER_BALANCE:
            return {
                ...state,
                User: {
                    ...state.User,
                    balance: action.payload
                }
            };
        case actionType.SET_USER_KPOINTS:
            return {
                ...state,
                User: {
                    ...state.User,
                    kpoints: action.payload
                }
            };
        case actionType.SET_USER_NOTIFICATIONS_READ:
            return {
                ...state,
                User: {
                    ...state.User,
                    notifications: {
                        ...state.User.notifications,
                        haveUnread: action.payload
                    }
                }
            };
        case actionType.SET_USER_NOTIFICATIONS_LIST:
            return {
                ...state,
                User: {
                    ...state.User,
                    notifications: {
                        ...state.User.notifications,
                        list: action.payload
                    }
                }
            };
        case actionType.PUSH_USER_NOTIFICATIONS_LIST:
            return {
                ...state,
                User: {
                    ...state.User,
                    notifications: {
                        ...state.User.notifications,
                        list: [...state.User.notifications.list, action.payload]
                    }
                }
            };
        case actionType.SET_USER_HISTORY_LIST:
            return {
                ...state,
                User: {
                    ...state.User,
                    history: action.payload
                }
            };
        default:
            return state;
    }
};

export default reducer;