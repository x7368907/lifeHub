import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/DashboardScreen";
import TaskScreen from "../screens/TaskScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import AIScreen from "../screens/AIScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { theme } from "../theme/theme";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTitleStyle: { color: theme.colors.text, fontWeight: "600" },
        tabBarStyle: { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border },
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tasks" component={TaskScreen} />
      <Tab.Screen name="Expenses" component={ExpenseScreen} />
      <Tab.Screen name="AI" component={AIScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
