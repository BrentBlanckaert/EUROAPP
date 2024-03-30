import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {styles} from "../general_style";
import {useEffect, useState} from "react";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {collection, getDocs, doc, getDoc, addDoc, setDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../../FirebaseConfig";
import React from "react";


export default function DetailScreen({route, navigation}) {
	const { id, name, countries, members, memberData } = route.params;
	const [label, setLabel] = useState("");
	const [value, setValue] = useState("");
	const [isFocus, setIsFocus] = useState(false);
	const [memberslist, setMembers] = useState(members);
	const [memberDatalist, setMemberData] = useState(memberData);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [participating, setParticipating] = useState(false);
	const [currentMemDataID, setCurrentMemDataID] = useState("");

	const fontSize = name.length > 15 ? 20 : 40

	async function participate() {
		setLoading(true);
		const docRef = doc(FIRESTORE_DB, "event", `${id}`)
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
		memberDatalist.push(memdataRef.id)
		setMemberData(memberDatalist)

		await setDoc(docRef, {
			members: memberslist,
			memberData: memberDatalist
		}, {
			merge: true
		});
		const user = FIREBASE_AUTH.currentUser
		const docUserRef = doc(FIRESTORE_DB, "users", `${user.uid}`)
		const querySnapshot = await getDoc(docUserRef);
		if (querySnapshot.exists()){
			const userdata = querySnapshot.data()
			data.push({"label": userdata.username, "value": memdataRef.id})
			setData(data)
			setCurrentMemDataID(memdataRef.id)
			setLabel(userdata.username)
			setValue(memdataRef.id)
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
					data.push({"label": userdata.username, "value": memberDatalist[i]})
					setData(data)
					if (user !== null && user.uid === memberslist[i]){
						setParticipating(true)
						setCurrentMemDataID(memberDatalist[i])
						setLabel(userdata.username)
						setValue(memberDatalist[i])
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
					onChange={item => {
						setLabel(item.label)
						setValue(item.value);
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
						onPress={() => {
							const index = memberDatalist.indexOf(currentMemDataID)
							setLabel(data[index].label)
							setValue(currentMemDataID)
						}}
					>
						<Text style={styles.text}>
							Go to my score
						</Text>
					</Pressable>
				}
				<Text style={detailStyles.text}>{label}</Text>
				<Text>{id}</Text>
				<Text>{countries}</Text>
				<Text>{memberslist}</Text>
				<Text>{memberDatalist}</Text>
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