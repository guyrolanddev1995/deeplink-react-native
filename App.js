import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Link, NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import {useEffect, useState} from "react";
import * as Linking from "expo-linking"


const Stack = createNativeStackNavigator();
const prefix = Linking.createURL("/")

const state = {
    RouteNames: ["Home", "About"],
    routes: [
        {name: "Home"},
        {name: 'About'},
    ],
};

export default function App() {
    const [data, setData] = useState(null)

    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                Home: "home",
                About: "about"
            }
        }
    }
    const handleDeepLinking = (event) => {
        let data = Linking.parse(event.url)
    }

    useEffect(() => {
        const getInitialUrl = async ()=> {
            const initialUrl = await Linking.getInitialURL()

            if(initialUrl) {
                setData(Linking.parse(initialUrl))
            }
        }

        if(!data) {
            getInitialUrl()
        }

        Linking.addEventListener("url", handleDeepLinking)
    }, []);

  return (
      <NavigationContainer
          linking={linking}
          initialState={state}

      >
        <Stack.Navigator initialRouteName="Home">
             <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
