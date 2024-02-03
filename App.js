import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import CreateEvent from "./src/pages/CreateEvent";
import {useEffect, useState} from "react";
import firebase from "firebase/compat";
import {User, onAuthStateChanged} from "firebase/auth";
import {FIREBASE_AUTH} from "./FirebaseConfig";
import EventList from "./src/pages/EventList";
import Ionicons from "react-native-vector-icons/Ionicons"
import {Button} from "react-native";
import DetailScreen from "./src/pages/DetailScreen";
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
      <InsideStack.Navigator>
        <InsideStack.Screen
          name={"Event list"}
          component={EventList}
          options={{
            headerShown : true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTintColor: '#fff',
            headerRight: () => (
              <Ionicons name={"settings-outline"} size={35} color={"black"} onPress={() => alert("settings woooo!")}/>
            )
          }}/>
        <InsideStack.Screen 
          name={"Create a eurovision event"} 
          component={CreateEvent} 
          options={{
            headerShown : true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTintColor: '#fff',
        }}/>
        <InsideStack.Screen
          name={"DetailScreen"}
          component={DetailScreen}
          options={{
            headerShown : true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTintColor: '#fff',
          }}/>
      </InsideStack.Navigator>
    )
}

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  }, []);

  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          {user ? (
            <Stack.Screen name={"Inside"} component={InsideLayout} options={{ headerShown : false}}/>
          ) : (
            <Stack.Screen name={"Login"} component={Login} options={{ headerShown : false}}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

