import {
	View,
	Text,
	TextInput,
	ActivityIndicator,
	Button,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	Pressable
} from "react-native"
import React, {useEffect, useState} from "react";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../../FirebaseConfig";
import {useTailwind} from "tailwind-rn";
import { ListItem } from 'react-native-elements'
import {collection, getDocs, addDoc, setDoc } from "firebase/firestore";
import {styles} from "../general_style";

export default function CreateEvent({navigation}) {

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [allCountries, setCountries] = useState([]);
	const [selectedCountries, setSelectedCountries] = useState([]);

	useEffect( () => {
		setSelectedCountries([]);
		const allCountries = async () => {
			const querySnapshot = await getDocs(collection(FIRESTORE_DB, "countries"));
			const countries = [];
			querySnapshot.forEach((doc) => {
				countries.push(doc.data().name)
			});
			countries.sort();
			setCountries(countries);
		};
		allCountries();
	}, []);

	async function makeEvent() {
		setLoading(true);
		try {
			const docRef = await addDoc(collection(FIRESTORE_DB, "event"), {
				name: name,
				date_of_creation: new Date(),
				countries: selectedCountries,
				memberData: [],
				members: [FIREBASE_AUTH.currentUser.uid]
			});

			const memdataRef = await addDoc(collection(FIRESTORE_DB, "memberdata"), {
				event_id: docRef.id,
				scores: [],
				user_id: FIREBASE_AUTH.currentUser.uid
			});

			const scores = new Array(selectedCountries.length*3).fill(0)
			await setDoc(memdataRef, {
				scores: scores
			}, {
				merge: true
			});

			await setDoc(docRef, {
				memberData: [memdataRef.id]
			}, {
				merge: true
			});
			setLoading(false);
		} catch (e) {
			alert("Error adding document: " + e);
		} finally {
			navigation.goBack()
		}

	}

	function selectCountry(index) {
		const temp = [...allCountries]
		const previousSecondElementOfTheArray = temp.splice(index, 1);
		setCountries(temp);
		const tempSelected = [...selectedCountries]
		tempSelected.push(previousSecondElementOfTheArray[0]);
		setSelectedCountries(tempSelected)
	}

	function removeCountry(index) {
		const tempSelected = [...selectedCountries]
		const previousSecondElementOfTheArray = tempSelected.splice(index, 1);
		setSelectedCountries(tempSelected);
		const temp = [...allCountries]
		temp.push(previousSecondElementOfTheArray[0])
		temp.sort()
		setCountries(temp);
	}

	return (
		<SafeAreaView style={{
			backgroundColor: "#371c73",
			height: '100%',
			padding: 20,
			flex: 1,
			flexDirection: "column",
			justifyContent: "center",
			marginTop: 0.5}}>
			<TextInput
				value={name}
				autoCapitalize={"none"}
				style={{backgroundColor: "white", borderWidth: 4, borderRadius: 20, borderColor: "gray", padding: 15, fontSize: 16}}
				placeholder={"Insert the name of the event"} onChangeText={(text) => setName(text)}
			/>
			<Text style={{marginLeft: 8, marginBottom:8, marginTop:8, fontWeight: "bold", fontSize: 16,}}>Available countries</Text>
			<ScrollView style={{height: '70%', flexGrow: 0, borderWidth: 4, borderRadius: 8, borderColor: "blue"}}>
				{
					allCountries.map((l, i) => (
						<Pressable style={styles.cell} key={i} onPress={() => selectCountry(i)}>
							<Text style={{fontWeight: "bold", color: "white", fontSize: 20}}>{l}</Text>
						</Pressable>
					))
				}
			</ScrollView>
			<Text style={{marginLeft: 8, marginBottom:8, marginTop:8, fontWeight: "bold", fontSize: 16,}}>Selected countries</Text>
			<ScrollView style={{height: '70%', flexGrow: 0, borderWidth: 4, borderRadius: 8, borderColor: "red"}}>
				{
					selectedCountries.map((l, i) => (
						<Pressable style={styles.cell} key={i} onPress={() => removeCountry(i)}>
							<Text style={{fontWeight: "bold", color: "white", fontSize: 20}}>{i+1}: {l}</Text>
						</Pressable>
					))
				}
			</ScrollView>
			{ loading ? (<ActivityIndicator size={"large"} color={"#0000ff"} />)
				: (
					<Pressable style={styles.button} onPress={makeEvent}>
						<Text style={styles.text}>Make event</Text>
					</Pressable>
				)
			}
		</SafeAreaView>
	)
}