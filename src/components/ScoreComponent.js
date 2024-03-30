import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import ScoreField from "./ScoreField";
import {useEffect, useState} from "react";

export default function ScoreComponent({title, scoreSong, scoreAct, scoreCostume, editable, changeScore}) {

	const [songVal, setSong] = useState(scoreSong);
	const [actVal, setAct] = useState(scoreAct);
	const [costumeVal, setCostume] = useState(scoreCostume);

	useEffect( () => {
		setSong(scoreSong)
		setAct(scoreAct)
		setCostume(scoreCostume)
	}, [scoreSong, scoreAct, scoreCostume]);

	function setSongScore(text) {
		changeScore([parseInt(text), actVal, costumeVal])
		setSong(parseInt(text))
	}

	function setActScore(text) {
		changeScore([songVal, parseInt(text), costumeVal])
		setAct(parseInt(text))
	}

	function setCostumeScore(text) {
		changeScore([songVal, actVal, parseInt(text)])
		setCostume(parseInt(text))
	}

	return (
		<View style={detailStyles.card}>
			<Text style={detailStyles.title}>Country: {title}</Text>
			<View style={detailStyles.scoreCard}>
				<ScoreField string={"Song: "} score={songVal} editable={editable} callbackScore={setSongScore}/>
				<ScoreField string={"Act: "} score={actVal} editable={editable} callbackScore={setActScore}/>
				<ScoreField string={"Costume: "} score={costumeVal} editable={editable} callbackScore={setCostumeScore}/>
			</View>
			<View>
				<View style={detailStyles.scoreField}>
					<Text style={detailStyles.score}>{Math.round(((songVal + actVal + costumeVal) / 3) * 10) / 10}</Text>
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