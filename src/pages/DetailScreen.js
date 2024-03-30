import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {styles} from "../general_style";
import {useEffect, useState} from "react";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {collection, getDocs, doc, getDoc, addDoc, setDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../../FirebaseConfig";
import React from "react";
import ScoreComponent from "../components/ScoreComponent";


export default function DetailScreen({route, navigation}) {
	const { id, name, countries, members, memberData } = route.params;
	const [label, setLabel] = useState(""); // dropdown label
	const [value, setValue] = useState(""); // dropdown value
	const [isFocus, setIsFocus] = useState(false);
	const [memberslist, setMembers] = useState(members); // list of members
	const [memberScores, setMemberScores] = useState([]); // list of member scores
	const [memberDataIdList, setMemberDataIds] = useState(memberData); // list of member data ids
	const [data, setData] = useState([]); // dropdown data
	const [loading, setLoading] = useState(false);
	const [participating, setParticipating] = useState(false);
	const [currentMemDataID, setCurrentMemDataID] = useState(""); // memory data id of my account

	const fontSize = name.length > 15 ? 20 : 40

	async function getMemberData(id) {
		setValue(id)
		const docRef = doc(FIRESTORE_DB, "memberdata", `${id}`)
		const querySnapshot = await getDoc(docRef);
		if (querySnapshot.exists()){
			const memdata = querySnapshot.data()
			setMemberScores(memdata.scores)
			console.log(memdata.scores)
		}
	}

	async function participate() {
		setLoading(true);
		// Loads the given event from the database
		const docRef = doc(FIRESTORE_DB, "event", `${id}`)
		// Adds the current user to the list of members
		memberslist.push(FIREBASE_AUTH.currentUser.uid)
		setMembers(memberslist)
		const memdataRef = await addDoc(collection(FIRESTORE_DB, "memberdata"), {
			event_id: id,
			scores: [],
			user_id: FIREBASE_AUTH.currentUser.uid
		});

		const scores = new Array(countries.length * 3).fill(0)
		await setDoc(memdataRef, {
			scores: scores
		}, {
			merge: true
		});
		memberDataIdList.push(memdataRef.id)
		setMemberDataIds(memberDataIdList)

		// Updates the event with the new member list and member data list
		await setDoc(docRef, {
			members: memberslist,
			memberData: memberDataIdList
		}, {
			merge: true
		});

		// Loads the user data from the database
		const user = FIREBASE_AUTH.currentUser
		const docUserRef = doc(FIRESTORE_DB, "users", `${user.uid}`)
		const querySnapshot = await getDoc(docUserRef);
		if (querySnapshot.exists()){
			const userdata = querySnapshot.data()
			// Adds the user to the dropdown list
			data.push({"label": userdata.username, "value": memdataRef.id})
			setData(data)
			setCurrentMemDataID(memdataRef.id)
			setLabel(userdata.username)
			await getMemberData(memdataRef.id)
		}
		setParticipating(true)
		setLoading(false);
	}

	useEffect( () => {
		navigation.setOptions({
			title: name,
			headerTitleStyle: {
				FontSize: fontSize
			}
		})
		const auth = getAuth();
		const user = auth.currentUser;
		const allMembers = async () => {
			for (let i=0; i < memberslist.length; i++) {
				const docRef = doc(FIRESTORE_DB, "users", `${memberslist[i]}`)

				const querySnapshot = await getDoc(docRef);
				if (querySnapshot.exists()){
					const userdata = querySnapshot.data()
					data.push({"label": userdata.username, "value": memberDataIdList[i]})
					setData(data)
					if (user !== null && user.uid === memberslist[i]){
						setParticipating(true)
						setCurrentMemDataID(memberDataIdList[i])
						setLabel(userdata.username)
						await getMemberData(memberDataIdList[i])
					}
				}
			}
		}
		allMembers()
	}, [navigation]);

	return (
		<View style={{
			backgroundColor: "#838383",
			height: "100%"}}>
			<View style={{
				height: "90%", width: "100%",
				flexDirection: "column",
				alignItems: "center",
				padding: 8}}>
				<Dropdown
					style={[detailStyles.dropdown, isFocus && { borderColor: 'blue' }]}
					placeholderStyle={detailStyles.placeholderStyle}
					selectedTextStyle={detailStyles.selectedTextStyle}
					inputSearchStyle={detailStyles.inputSearchStyle}
					iconStyle={detailStyles.iconStyle}
					data={data}
					search
					max
					width="300"
					maxHeight={300}
					labelField="label"
					valueField="value"
					placeholder={!isFocus ? 'Select user' : '...'}
					searchPlaceholder="Search..."
					value={value}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					onChange={async item => {
						setLabel(item.label)
						await getMemberData(item.value);
						setIsFocus(false);
					}}
					renderLeftIcon={() => (
						<AntDesign
							style={detailStyles.icon}
							color={isFocus ? 'blue' : 'black'}
							name="Safety"
							size={20}
						/>
					)}
				/>
				{ currentMemDataID === value || ! participating ? <></> :
					<Pressable
						style={detailStyles.button}
						onPress={async () => {
							const index = memberDataIdList.indexOf(currentMemDataID)
							setLabel(data[index].label)
							await getMemberData(currentMemDataID)
						}}
					>
						<Text style={styles.text}>
							Go to my score
						</Text>
					</Pressable>
				}
				<Text style={detailStyles.text}>{label}</Text>
				<ScrollView style={{width: "100%", height: "100%", borderRadius: 50}}>
					{ memberScores.length > 0 ? countries.map((l, i) => (
						<ScoreComponent
							title={l}
							scoreSong={memberScores[i*3]}
							scoreAct={memberScores[i*3+1]}
							scoreCostume={memberScores[i*3+2]}
							editable={currentMemDataID === value}
						/>
					)) : <></>}
				</ScrollView>
			</View>
			{ ! participating ?
				<View style={{
					height: "10%",
					flexDirection: "column",
					alignItems: "center",
					padding: 8}}>
					{ loading ? (<ActivityIndicator size={"large"} color={"#0000ff"} />) :
					<Pressable
						style={styles.button}
						onPress={participate}
					>
						<Text style={styles.text}>
							Participate in event
						</Text>
					</Pressable> }
				</View> : <></>
			}
		</View>
	)
}

const detailStyles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: '#00089d',
		marginTop: 5,
		width: "60%"
	},
	text: {
		fontSize: 30,
		lineHeight: 35,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
	dropdown: {
		width: '100%',
		margin: 16,
		height: 50,
		borderBottomColor: 'gray',
		borderBottomWidth: 0.5,
		borderWidth: 2,
		borderRadius: 8
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});