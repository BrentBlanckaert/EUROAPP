import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {FIRESTORE_DB} from "../../FirebaseConfig";
import {styles} from "../general_style";


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
					events.push({
						id: doc.id,
						name: doc.data().name,
						countries: doc.data().countries,
						members: doc.data().members,
						memberData: doc.data().memberData,
						date: new Date(milliseconds)})
				});
				events.sort((a, b) => b.date - a.date);
				setEvents(events);
			};
			allEvents()
		});

	}, [navigation]);

	return (
		<View style={{
			backgroundColor: "#371c73",
			height: "100%", flex: 1,
			flexDirection: "column", justifyContent: "center",
			alignItems: "center", padding: 8}}>
			<ScrollView style={{height: "90%", width: "100%"}}>
				{
					events.map((l, i) => (
						<Pressable
							style={styles.cell}
							key={i}
							onPress={() => navigation.navigate("Scores", {
								id: l.id,
								name: l.name,
								countries: l.countries,
								members: l.members,
								memberData: l.memberData})
							}
						>
							<Text style={{fontWeight: "bold", color: "white", fontSize: 30}}>{l.name}</Text>
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