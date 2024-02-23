import { View, StyleSheet } from "react-native"
import { useState, useEffect } from "react";
import { Card, Divider, Surface, Text } from "react-native-paper";
import * as Location from "expo-location"
import { WeatherCard } from "../components/WeatherCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { WeatherView } from "../components/WeatherView";

export const HomeScreen = ({navigation}) => {
    const [location, setLocation] = useState();
    const [errorMsg, setErrorMsg] = useState(null);
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [weather, setWeather] = useState()

    useEffect(() => {
        (async () => {
          
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            //let location = await Location.getCurrentPositionAsync({});
            setLocation({latitude:43.44, longitude:-63.44})
            setCity("Berlin")
            setCountry("Germany")
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
        <>
        {location ? 
        <WeatherView city={city} country={country} long={location.longitude} lat={location.latitude}/> 
        : <></>}
        </>
        // <View style={{ flex: 1, display:"flex", flexDirection:"column", alignItems:"center" }}>
        //     {location &&
        //         <WeatherCard coords={location.coords} city={city} country={country} weatherData={{temp:-1, code:0}} style={{height:"60%"}}/>
        //     }

        //     <Surface style={{marginTop:-30, backgroundColor:"white", borderRadius:30, padding:20,  width:"100%", display:"flex", justifyContent:"space-around", flex:1, borderBottomStartRadius:0, borderBottomEndRadius:0}}>


        //         <View style={styles.surface} >
        //             <Text style={{color:"#cecece"}}> Percepitation </Text>
        //             <Text style={{color:"#a3a3a3"}} variant="titleMedium">30%</Text>
        //         </View>
        //         <Divider/>
        //         <View style={styles.surface}>
        //             <Text style={{color:"#cecece"}}> Wind </Text>
        //             <Text style={{color:"#a3a3a3"}} variant="titleMedium">22km/h</Text>
        //         </View>
        //         <Divider/>
        //         <View style={styles.surface}>
        //             <Text style={{color:"#cecece"}}> Humidity </Text>
        //             <Text style={{color:"#a3a3a3"}} variant="titleMedium">50%</Text>
        //         </View>

        //     </Surface>
        // </View>
    )
}

const styles = StyleSheet.create({
    surface:{
        // borderRadius:10,
        margin:0,
        padding:20,
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        // backgroundColor: "white"
    }
})

