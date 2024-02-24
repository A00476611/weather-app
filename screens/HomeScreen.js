import { View } from "react-native"
import { useState, useEffect } from "react";
import * as Location from "expo-location"
import { WeatherView } from "../components/WeatherView";

export const HomeScreen = ({navigation}) => {
    const [location, setLocation] = useState();
    const [errorMsg, setErrorMsg] = useState(null);
    const [city, setCity] = useState();
    const [country, setCountry] = useState();

    useEffect(() => {
        (async () => {
          
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation({latitude:location.coords.latitude, longitude:location.coords.longitude})
            setTimeout(async () => {
                let geocode = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
    
                if (geocode.length > 0) {
                    const address = geocode[0];
                    setCity(address?address.city:"");
                    setCountry(address?address.country:"")
                }
            }, 1000);

        })();
      }, []);

    return (
        <>
        {location ? 
        <WeatherView city={city} country={country} long={location.longitude} lat={location.latitude} /> 
        : <></>}
        </>
    )
}

