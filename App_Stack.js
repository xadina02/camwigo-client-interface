import * as React from 'react'
import { Pressable, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import AboutScreen from './Screens/AboutScreen'

const Stack = createNativeStackNavigator()

export const AboutStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: {
        backgroundColor: "#6a51ae"
      },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
      headerRight: () => (
        <Pressable onPress={() => alert("Menu button pressed")}>
          <Text style={{ fontSize: 16, color: "#fff" }}>Menu</Text>
        </Pressable>
      )
    }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        title: "My Home Screen"
      }}/>
      <Stack.Screen name="About" component={AboutScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AboutStack />
    </NavigationContainer>
  )
}