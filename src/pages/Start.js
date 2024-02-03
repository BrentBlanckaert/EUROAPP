import {useTailwind} from 'tailwind-rn';
import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function Start() {
    const tailwind = useTailwind();

    return (
        <View style={tailwind('bg-red-200 flex flex-1 items-center justify-center')}>
            <Text>Open up App.js to start working on yours app!</Text>
            <StatusBar style="auto" />
        </View>
    )
}