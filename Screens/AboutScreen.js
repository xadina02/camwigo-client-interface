import {View, Text, Button, StyleSheet} from 'react-native'

export default function AboutScreen ({navigation}) {
    // const {name} = route.params
    return (
        <View style={styles.container}>
            <Text>This page is about</Text>
            <Button title='Got to Home Screen' onPress={() => navigation.navigate("Home")}/>
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