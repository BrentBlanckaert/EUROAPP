import {View, Text, TextInput, ActivityIndicator, Button, StyleSheet, Pressable} from "react-native"
import React, {useState} from "react";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../../FirebaseConfig";
import {useTailwind} from "tailwind-rn";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {doc, addDoc, collection, setDoc} from "firebase/firestore";
import {styles} from "../general_style";


export default function CreateAccount() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [conf_password, setConfPassword] = useState("");
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const auth = FIREBASE_AUTH;
	const tailwind = useTailwind();

	const signUp = async () => {
		setLoading(true);
		console.log(email);
		console.log(password);
		alert("email: " + email);
		try {
			if (password === conf_password){
				const response = await createUserWithEmailAndPassword(auth, email, password);
				console.log(response);
				console.log(response.uid)
				await setDoc(doc(FIRESTORE_DB, `users`, `${response.user.uid}`), {
					username: username,
				});

			}
		} catch (error) {
			console.log(error);
			alert('Registration failed ' + error.message)
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={{padding: 5, display: "flex", flex: 1, backgroundColor: "#371c73"}}>
			<View style={tailwind('flex flex-col w-full h-full')}>
				<Text style={{color: "white", marginTop: 30, marginLeft: 10, marginBottom: 10, fontSize: 20, fontWeight: "bold"}}>
					Username
				</Text>
				<TextInput
					value={username}
					autoCapitalize={"none"}
					style={{backgroundColor: "white", width: "full", borderRadius: 20, padding: 15, marginBottom: 10}}
					placeholder={"Username"} onChangeText={(text) => setUsername(text)}
				/>
				<Text style={{color: "white", marginLeft: 10, marginBottom: 10, fontSize: 20, fontWeight: "bold"}}>
					Email
				</Text>
				<TextInput
					value={email}
					autoCapitalize={"none"}
					style={{backgroundColor: "white", width: "full", borderRadius: 20, padding: 15, marginBottom: 10}}
					placeholder={"Email"} onChangeText={(text) => setEmail(text)}
				/>
				<Text style={{color: "white", marginLeft: 10, marginBottom: 10, fontSize: 20, fontWeight: "bold"}}>
					Password
				</Text>
				<TextInput
					value={password}
					autoCapitalize={"none"}
					secureTextEntry={true}
					style={{backgroundColor: "white", width: "full", borderRadius: 20, padding: 15, marginBottom: 10}}
					placeholder={"Password"} onChangeText={(text) => setPassword(text)}
				/>
				<Text style={{color: "white", marginLeft: 10, marginBottom: 10, fontSize: 20, fontWeight: "bold"}}>
					Confirm password
				</Text>
				<TextInput
					value={conf_password}
					autoCapitalize={"none"}
					secureTextEntry={true}
					style={{backgroundColor: "white", width: "full", borderRadius: 20, padding: 15, marginBottom: 50}}
					placeholder={"Password"} onChangeText={(text) => setConfPassword(text)}
				/>
				{ loading ? (<ActivityIndicator size={"large"} color={"#0000ff"} />)
					: (
						<View>
							<Pressable
								style={styles.button}
								onPress={signUp}
							>
								<Text style={styles.text}>
									Create account
								</Text>
							</Pressable>
						</View>
					)
				}
			</View>
		</View>
	)
}