import {StyleSheet, Text, TextInput, View} from "react-native";

export default function ScoreField({string, score, editable}) {
	let scoreFieldStyle = detailStyles.scoreFieldLow;
	if (score >= 10) {
		scoreFieldStyle = detailStyles.scoreFieldHighest;
	} else if (score >= 7) {
		scoreFieldStyle = detailStyles.scoreFieldHigh;
	} else if (score >= 4) {
		scoreFieldStyle = detailStyles.scoreFieldMedium;
	}
			return (
				<View style={detailStyles.card}>
					<Text style={detailStyles.title}>{string}</Text>
					<View style={scoreFieldStyle}>
						{editable ? <TextInput keyboardType={'numeric'}/>:
							<Text style={detailStyles.score}>{score}</Text>
						}
					</View>
				</View>
		)
}

const detailStyles = StyleSheet.create({
	scoreFieldHighest: {
		backgroundColor: "rgba(120,0,255,0.4)",
		borderRadius: 8,
		padding: 5,
		width: 100,
		marginTop: 5,
	},
	scoreFieldHigh: {
		backgroundColor: "rgba(12,211,0,0.4)",
		borderRadius: 8,
		padding: 5,
		width: 100,
		marginTop: 5,
	},
	scoreFieldMedium: {
		backgroundColor: "rgba(255,197,2,0.4)",
		borderRadius: 8,
		padding: 5,
		width: 100,
		marginTop: 5,
	},
	scoreFieldLow: {
		backgroundColor: "rgba(255,0,0,0.4)",
		borderRadius: 8,
		padding: 5,
		width: 100,
		marginTop: 5,
	},
	title: {
		fontSize: 19,
		color: "#ffffff",
		fontWeight: "normal",
		justifyContent: "center",
	},
	score: {
		fontSize: 19,
		color: "#000000",
		fontWeight: "normal",
		justifyContent: "center",
		textAlign: "center",
	}
});