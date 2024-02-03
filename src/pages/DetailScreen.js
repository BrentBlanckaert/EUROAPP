import {Text, View} from "react-native";


export default function DetailScreen({route, navigation}) {
	const { id, name } = route.params;

	return (
		<View>
			<Text>{name}</Text>
		</View>
	)
}