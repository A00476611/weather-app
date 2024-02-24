import { useEffect, useState } from "react"
import { Card, Icon, Surface, Text } from "react-native-paper"
import { Pressable, StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import weathercodes from "../utils/WeatherCodes.json"


const sunny = {
    text:"#c7a94a",
    icon:"#ffc100",
    bg:"#ffe799",
    gradient:['#ffefbe', '#ffe799']
}

export const WeatherCard = ({lat, long, city, country, onHold, weatherData}) => {
    const [weather, setWeather] = useState()
    const [colorScheme, setColorScheme] = useState(sunny)
    useEffect(()=>{
        if(weatherData) setWeather(weatherData)
        else
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(2)}&longitude=${long.toFixed(2)}&current=temperature_120m,weathercode`).then(res=> res.json()).then(({current}) => {
                console.log(current)
                setWeather({temp: current.temperature_120m, code:current.weathercode})
            }
            )
    },[lat,long])
    return (
        <Pressable style={{borderRadius:10,height:150, overflow:"hidden"}} mode="flat" onLongPress={onHold} >
            {weather &&
            <LinearGradient colors={colorScheme.gradient} start={[0, 0]} end={[1, 1]} location={[0.25, 0.4, 1]} style={{padding:20, height:"100%", display:"flex", justifyContent:"center"}}>
                <View style= {{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"start"}}>
                    <Icon source="weather-sunny" color={colorScheme.icon} size={75}/>
                    <View style= {{display:"flex", alignItems:"flex-end"}}>
                        <Text variant="bodySmall" style={{color:colorScheme.text}}>{weathercodes[weather.code].desc}</Text>
                        <Text style={{color:colorScheme.text, fontSize:50}}>{weather.temp}°</Text>
                        <Text variant="titleSmall" style={{color:colorScheme.text}}>{city}, {country}</Text>
                    </View>
                </View>
            </LinearGradient>}
        </Pressable>
    )
}