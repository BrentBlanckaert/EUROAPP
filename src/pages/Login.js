import {View, Text, TextInput, ActivityIndicator, Button, StyleSheet, Pressable} from "react-native"
import React, {useState} from "react";
import {FIREBASE_AUTH} from "../../FirebaseConfig";
import {useTailwind} from "tailwind-rn";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {styles} from "../general_style";

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const tailwind = useTailwind();

    const signIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
            alert('Sign in failed ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{padding: 5, display: "flex", flex: 1, backgroundColor: "#371c73"}}>
            <View style={{display: "flex", flexDirection: "column", width: "full", height: "full"}}>
                <View style={{justifyContent: "center", marginVertical: 100, alignContent: "center"}}>
                    <Text
                      style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: 45,
                          color: "#ffffff",
                    }}
                    >
                        EuroScores
                    </Text>
                </View>
                <View style={{justifyContent: "center"}}>
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
                      style={{backgroundColor: "white", width: "full", borderRadius: 20, padding: 15, marginBottom: 50}}
                      placeholder={"Password"} onChangeText={(text) => setPassword(text)}
                    />
                    { loading ? (<ActivityIndicator size={"large"} color={"#0000ff"} />)
                      : (
                        <View>
                            <Pressable
                              style={styles.button}
                              onPress={signIn}
                            >
                                <Text style={styles.text}>
                                    Login
                                </Text>
                            </Pressable>
                            <Pressable
                              style={styles.button}
                              onPress={() => {
                                  navigation.navigate("Create an account")}}
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
        </View>
    )
}

