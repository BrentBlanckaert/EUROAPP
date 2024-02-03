import {View, Text, TextInput, ActivityIndicator, Button, StyleSheet, Pressable} from "react-native"
import React, {useState} from "react";
import {FIREBASE_AUTH} from "../../FirebaseConfig";
import {useTailwind} from "tailwind-rn";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const tailwind = useTailwind();

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Your email is ' + email)
        } catch (error) {
            console.log(error);
            alert('Sign in failed ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        console.log(email);
        console.log(password);
        alert("email: " + email);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Your email is ' + email)
        } catch (error) {
            console.log(error);
            alert('Registration failed ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={tailwind('bg-gray-400 flex flex-1  p-5')}>
            <View style={tailwind('flex flex-col w-full h-full justify-center')}>
                <Text style={tailwind("ml-2 mb-2 text-xl font-bold")}>Email</Text>
                <TextInput
                    value={email}
                    autoCapitalize={"none"}
                    style={tailwind('bg-white w-full rounded-lg p-3 mb-4')}
                    placeholder={"Email"} onChangeText={(text) => setEmail(text)}
                />
                <Text style={tailwind("ml-2 mb-2 text-xl font-bold")}>Password</Text>
                <TextInput
                    value={password}
                    autoCapitalize={"none"}
                    secureTextEntry={true}
                    style={tailwind('bg-white w-full rounded-lg p-3 mb-4')}
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

const styles = StyleSheet.create({
    cell: {
        borderWidth: 4,
        borderRadius: 8,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
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