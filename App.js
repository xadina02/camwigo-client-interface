import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react';
import FloatingBottomTab from './components/FloatingBottomTab';
import LandingScreen from './Screens/LandingScreen'
import ListScreen from './Screens/ListScreen'
import ReservationScreen from './Screens/ReservationScreen'
import TicketDetailsScreen from './Screens/TicketDetailsScreen'
import RegistrationScreen from './Screens/RegistrationScreen'
import PaymentScreen from './Screens/PaymentScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LandingScreen" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="LandingScreen" component={LandingScreen}/>
                <Stack.Screen name="ListScreen" component={ListScreen}/>
                <Stack.Screen name="ReservationScreen" component={ReservationScreen}/>
                <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
                <Stack.Screen name="TicketDetailsScreen" component={TicketDetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}