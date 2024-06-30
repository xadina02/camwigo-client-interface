import {View, Text, Button, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen () {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title='Got to About Screen' onPress={() => navigation.navigate("About", {
                name: "Adina"
            })}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "90%",
        height: "33%",
        borderSize: 2,
        borderColor: "green",
        marginVertical: 50
    }
})