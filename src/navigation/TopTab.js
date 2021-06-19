import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {UserPost} from '../components/userPost';
import {UserDetails} from '../components/userDetails';
const {Navigator, Screen} = createMaterialTopTabNavigator();
import {TabBar, Tab} from '@ui-kitten/components';
const TopTabBar = ({navigation, state}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title="User Posts" />
    <Tab title="User Details" />
  </TabBar>
);

export const TabNavigator = ({route}) => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen
      name="UserPost"
      component={UserPost}
      initialParams={{user: route.params.userid}}
    />
    <Screen
      name="UserDetails"
      component={UserDetails}
      initialParams={{user: route.params.userData}}
    />
  </Navigator>
);
