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
import CreateAccount from "./src/pages/AccountCreator";
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

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
              backgroundColor: '#00089d',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 35,
            },
            headerTintColor: '#fff',
            headerRight: () => (
              <Ionicons name={"settings-outline"} size={35} color={"white"} onPress={() => alert("settings woooo!")}/>
            )
          }}/>
        <InsideStack.Screen 
          name={"Create a eurovision event"} 
          component={CreateEvent} 
          options={{
            headerShown : true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#00089d',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTintColor: '#fff',
        }}/>
        <InsideStack.Screen
          name={"Scores"}
          component={DetailScreen}
          options={{
            headerShown : true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#00089d',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 35
            },
            headerTintColor: '#fff',
          }}/>
      </InsideStack.Navigator>
    )
}

function OutsideLayer() {
  return (
    <OutsideStack.Navigator>
      <OutsideStack.Screen
        name={"Login"}
        component={Login}
        options={{headerShown : false}}
      />
      <OutsideStack.Screen
        name={"Create an account"}
        component={CreateAccount}
        options={{
          headerShown : true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#6b70c9',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: '#fff',
      }}
      />
    </OutsideStack.Navigator>
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
            <Stack.Screen name={"Outside"} component={OutsideLayer} options={{ headerShown : false}}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

