import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
	cell: {
		backgroundColor: "rgba(148,38,38,0.42)",
		borderWidth: 2,
		borderRadius: 4,
		minHeight: 70,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 6,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 20,
		elevation: 3,
		backgroundColor: '#ffffff',
		marginTop: 10,
		width: "100%"
	},
	text: {
		fontSize: 19,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
		maxHeight: "100%",
	},
});