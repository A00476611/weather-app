import { View } from "react-native"
import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import * as Location from "expo-location"
import { WeatherCard } from "../components/WeatherCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { WeatherView } from "../components/WeatherView";

export const HomeScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [city, setCity] = useState();
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        (async () => {
          
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        
            //let location = await Location.getCurrentPositionAsync({});
            setLocation({coords:{latitude:43.44, longitude:-63.44}})
            setCity("Halifax")
            /*setTimeout(async () => {
                let geocode = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
    
                if (geocode.length > 0) {
                    const address = geocode[0];
                    setCity(address?address.city:"");
                }
            }, 1000);*/

        })();
      }, []);

    return (
        <SafeAreaView>
            {location &&
                <WeatherView lat={location.coords.latitude} long ={location.coords.longitude} city={city}/>
            }
        </SafeAreaView>
    )
}