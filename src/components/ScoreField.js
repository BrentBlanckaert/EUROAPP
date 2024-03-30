import {StyleSheet, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";

export default function ScoreField({string, score, editable, callbackScore}) {
	const [scoreVal, setScore] = useState(score); // score value
	const [scoreFieldStyle, setScoreFieldStyle] = useState(detailStyles.scoreFieldLow); // score value


	useEffect( () => {
		setScoreFieldStyle(detailStyles.scoreFieldLow)
		if (score >= 10) {
			setScoreFieldStyle(detailStyles.scoreFieldHighest)
		} else if (score >= 7) {
			setScoreFieldStyle(detailStyles.scoreFieldHigh)
		} else if (score >= 4) {
			setScoreFieldStyle(detailStyles.scoreFieldMedium)
		}
		setScore(score)
	}, [score, scoreFieldStyle]);

	function setNewScore(text) {
		if (text === "") {
			setScore(0)
			callbackScore(0)
		} else {
			const num = parseInt(text)
			if ( num < 0 ) {
				setScore(0)
				callbackScore(0)
			} else if ( num > 10 ) {
				setScore(10)
				callbackScore(10)
			} else {
				setScore(num)
				callbackScore(num)
			}
		}
	}

			return (
				<View style={detailStyles.card}>
					<Text style={detailStyles.title}>{string}</Text>
					<View style={scoreFieldStyle}>
						{editable ?
							<TextInput
								keyboardType={'numeric'}
								maxLength={2}
								value={scoreVal.toString()}
								defaultValue={`${scoreVal}`}
								onChangeText={text => setNewScore(text)}
								style={detailStyles.score}
							/>:
							<Text style={detailStyles.score}>{scoreVal}</Text>
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