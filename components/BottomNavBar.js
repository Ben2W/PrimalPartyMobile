import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Dashboard from "../pages/Dashboard";
import Friends from "../pages/Friends";
import Invites from "../pages/Invites";
import MyEvents from "../pages/MyEvents";

const DashboardRoute = () => Dashboard();

const InvitesRoute = () => Invites();

const FriendsRoute = () => Friends();

const MyEventsRoute = () => MyEvents();


const BottomNavBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'dashboard', title: 'Dashboard', icon: 'home' },
        { key: 'invites', title: 'Invites', icon: 'card-account-mail', badge: "5" },
        { key: 'friends', title: 'Friends', icon: 'account-multiple' },
        { key: 'myevents', title: 'My Events', icon: 'party-popper' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        dashboard: DashboardRoute,
        invites: InvitesRoute,
        friends: FriendsRoute,
        myevents: MyEventsRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default BottomNavBar;