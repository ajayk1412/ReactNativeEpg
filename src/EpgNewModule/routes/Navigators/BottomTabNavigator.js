import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen, EPGScreen, SettingsScreen } from '@screens';
import { Routes } from '@routes/enums/routeNames';
import { getTabBarIconNameByRoute } from '../../utils/navigators';
import { useTheme } from '../../hooks/useTheme';
import { Logo } from '../../design-system/components/Logo';
import { ScreenHeight } from '../../utils/dimensions';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ children }) => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={Routes.EPG}
      screenOptions={({ route }) => ({
        headerTitle: () => <Logo />,
        headerTitleAlign: 'center',
        headerTintColor: colors.app.ACCENT,
        headerStyle: {
          backgroundColor: colors.app.SECONDARY,
          height: ScreenHeight * 0.13,
        },
        tabBarActiveTintColor: colors.app.PRIMARY,
        tabBarInactiveTintColor: colors.app.ACCENT,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.app.TERTIARY,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = getTabBarIconNameByRoute(route.name);

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      {children}
    </Tab.Navigator>
  );
};

export const BottomTabNavigator = () => {
  return (
    <TabNavigator>
      <Tab.Screen name={Routes.HOME} component={HomeScreen} />
      <Tab.Screen name={Routes.EPG} component={EPGScreen} />
      <Tab.Screen name={Routes.SETTINGS} component={SettingsScreen} />
    </TabNavigator>
  );
};
