import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import ScoreField from "./ScoreField";

export default function ScoreComponent({title, scoreSong, scoreAct, scoreCostume, editable}) {
	return (
		<View style={detailStyles.card}>
			<Text style={detailStyles.title}>Country: {title}</Text>
			<View style={detailStyles.scoreCard}>
				<ScoreField string={"Song: "} score={scoreSong} editable={editable}/>
				<ScoreField string={"Act: "} score={scoreAct} editable={editable}/>
				<ScoreField string={"Costume: "} score={scoreCostume} editable={editable}/>
			</View>
			<View>
				<View style={detailStyles.scoreField}>
					<Text style={detailStyles.score}>{Math.round(((scoreSong + scoreAct + scoreCostume) / 3) * 10) / 10}</Text>
				</View>
			</View>
		</View>
	)
}

const detailStyles = StyleSheet.create({
	card: {
		width: "100%",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 15,
		elevation: 3,
		backgroundColor: '#6771ff',
		marginTop: 5,
		display: "flex",
	},
	scoreField: {
		backgroundColor: "rgba(246,246,246,0.42)",
		borderRadius: 8,
		padding: 5,
		marginTop: 10,
		alignContent: "center",
		justifyContent: "center",
	},
	scoreCard: {
		display: "flex",
		flexDirection: "row",
		marginTop: 5,
		justifyContent: "space-between"
	},
	title: {
		fontSize: 22,
		color: "#ffffff",
		fontWeight: "bold",
	},
	score: {
		fontSize: 21,
		color: "#000000",
		fontWeight: "bold",
		justifyContent: "center",
		textAlign: "center",
	}
});