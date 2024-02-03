import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {FIRESTORE_DB} from "../../FirebaseConfig";


export default function EventList({navigation}) {

	const [events, setEvents] = useState([]);

	useEffect( () => {
		navigation.addListener('focus', () => {
			const allEvents = async () => {
				const querySnapshot = await getDocs(collection(FIRESTORE_DB, "event"));
				const events = [];
				querySnapshot.forEach((doc) => {
					const firestoreTimestamp = doc.data().date_of_creation;
					const milliseconds = firestoreTimestamp.seconds * 1000 + firestoreTimestamp.nanoseconds / 1000000;
					events.push({id: doc.id, name: doc.data().name, date: new Date(milliseconds)})
				});
				events.sort((a, b) => b.date - a.date);
				setEvents(events);
			};
			allEvents()
		});

	}, [navigation]);

	return (
		<View style={{height: "100%", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 8}}>
			<ScrollView style={{height: "90%", width: "100%"}}>
				{
					events.map((l, i) => (
						<Pressable
							style={styles.cell}
							key={i}
							onPress={() => navigation.navigate("DetailScreen", {
								id: l.id,
								name: l.name
							})}
						>
							<Text style={{fontWeight: "bold", color: "white", fontSize: 20}}>{l.name}</Text>
						</Pressable>
					))
				}
			</ScrollView>
			<View style={{width: "100%"}}>
				<Pressable
					style={styles.button}
					onPress={() => navigation.navigate("Create a eurovision event")}
				>
					<Text style={styles.text}>
						Make an event
					</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cell: {
		backgroundColor: "#182767",
		borderWidth: 4,
		borderRadius: 8,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 6,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: '#f4511e',
		marginTop: 10,
		width: "100%"
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
});