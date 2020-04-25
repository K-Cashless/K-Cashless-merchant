import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainApp from '../scenes/MainApp';
import NotificationView from '../scenes/NotificationView';
import History from '../scenes/History';
import Profile from '../scenes/Profile';
import ManageAccount from '../scenes/ManageAccount';
import RequestMoney from '../scenes/RequestMoney';

const AppNavigator = createStackNavigator(
    {
        MainApp: {
            screen: MainApp
        },
        NotificationView: {
            screen: NotificationView
        },
        History: {
            screen: History
        },
        Profile: {
            screen: Profile
        },
        ManageAccount: {
            screen: ManageAccount
        },
        RequestMoney: {
            screen: RequestMoney,
        }
    },
    {
        initialRouteName: 'MainApp',
        // initialRouteName: 'Profile', // for Development Only
        headerMode: 'none',
        gesturesEnabled: false,
    }
);

export default createAppContainer(AppNavigator);