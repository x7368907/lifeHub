import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import TabNavigator from "./src/navigation/TabNavigator";
import { theme } from "./src/theme/theme";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={theme.colors.background} />
      <TabNavigator />
    </NavigationContainer>
  );
}
