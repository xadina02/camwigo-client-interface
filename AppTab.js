import { NavigationContainer } from '@react-navigation/native'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './Screens/HomeScreen.js'
import AboutScreen from './Screens/AboutScreen.js'
import HomeActiveIcon from './assets/home_active.png'
import TicketActiveIcon from './assets/tickets_active.png'
import Ionicons from '@expo/vector-icons/Ionicons'
import {AboutStack} from './App_Stack.js'

const Tab = createBottomTabNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                tabBarLabelPosition: "beside-icon",
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#070C35",
                tabBarInactiveTintColor: "blue"
            }}>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({color}) => (
                        // <Image source={HomeActiveIcon}/>
                        <Ionicons name="home" size={25} color={color}/>
                    )
                }}/>
                <Tab.Screen name="Tickets" component={AboutScreen} options={{
                    tabBarLabel: "My TIckets",
                    tabBarIcon: () => <Image source={TicketActiveIcon}/>
                }}/>
                <Tab.Screen name="About Stack" component={AboutStack} options={{
                    headerShown: false
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}