import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from '../components/Tab/SearchTab';
import FriendScreen from '../components/Tab/FriendTab';
import ChatScreen from '../components/Tab/ChatTab';
import GroupScreen from '../components/Tab/GroupTab';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="ChatTab"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        // eslint-disable-next-line no-dupe-keys
        tabBarActiveTintColor: '#2089dc',
        tabBarInactiveTintColor: '#cccccc',
        tabBarIndicatorStyle: {
          backgroundColor: '#fff',
          height: 5,
        },
        tabBarShowIcon: true,
      }}>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Zola',
          headerTitleStyle: {
            color: '#2089dc',
            fontWeight: 'bold',
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: 'Tìm',
        }}
      />
      <Tab.Screen
        name="Friend"
        component={FriendScreen}
        options={{
          title: 'Zola',
          headerTitleStyle: {
            color: '#2089dc',
            fontWeight: 'bold',
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: 'Bạn bè',
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatScreen}
        options={{
          title: 'Zola',
          headerTitleStyle: {
            color: '#2089dc',
            fontWeight: 'bold',
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: 'Chat',
        }}
      />

      <Tab.Screen
        name="GroupTab"
        component={GroupScreen}
        options={{
          title: 'Zola',
          headerTitleStyle: {
            color: '#2089dc',
            fontWeight: 'bold',
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: 'Group',
        }}
      />

      {/* <Tab.Screen
        name="AddressLL"
        component={AddressLLScreen}
        options={{
          title: 'Zola',
          headerTitleStyle: {
            color: '#2089dc',
            fontWeight: 'bold',
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: 'Danh bạ',
        }}
      /> */}
    </Tab.Navigator>
  );
};
export default Tabs;
