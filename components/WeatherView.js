import { Icon, Surface, Text, ActivityIndicator, Divider, Avatar, TextInput, Searchbar, IconButton, Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet  } from "react-native"
import { useState, useEffect, useContext } from "react"
import weathercodes from "../utils/WeatherCodes.json"
import { LinearGradient } from "expo-linear-gradient"
import { DBContext } from "../useDB"
import { ColorSchemes } from "../utils/colorSchemes"


//const db = new DB()
//const db = {insert:()=>{}}

const sunny = {
    text:"#c7a94a",
    icon:"#ffc100",
    bg:"#ffe799",
    gradient:['#ffefbe', '#ffe799']
}

export const WeatherView = ({long, lat, city, country, navigation}) => {
    const [weather, setWeather] = useState()
    const [colorScheme, setColorScheme] = useState(sunny)
    const db = useContext(DBContext)
    
    useEffect(()=>{
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(2)}&longitude=${long.toFixed(2)}&current=temperature_120m,weathercode,wind_speed_120m,precipitation_probability,relative_humidity_2m`).then(res=> res.json()).then(({current}) => {
            setColorScheme(ColorSchemes[weathercodes[current.weathercode].colorScheme])
            setWeather({temp: current.temperature_120m, code:current.weathercode, prec: current.precipitation_probability, wind: current.wind_speed_120m, humidity:current.relative_humidity_2m})
        }
        )
    },[lat,long])


    return (
        <View style={{ flex: 1, display:"flex", flexDirection:"column", alignItems:"center" }}>
            {weather && colorScheme &&
            <>
            <Surface style={{borderRadius:0, width:"100%", overflow:"hidden", height:"60%"}} mode="flat" >
                <LinearGradient colors={colorScheme.gradient} start={[0, 0]} end={[1, 1]} location={[0.25, 0.4, 1]} style={{padding:20, height:"100%", display:"flex", justifyContent:"center"}}>
                    <View style= {{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"start"}}>
                        <Icon source={weathercodes[weather.code].icon} color={colorScheme.icon} size={100}/>
                        <View style= {{display:"flex", alignItems:"flex-end"}}>
                            <Text variant="titleLarge" style={{color:colorScheme.text}}>{weathercodes[weather.code].desc}</Text>
                            <Text style={{color:colorScheme.text, fontSize:90}}>{weather.temp.toFixed(0)}°</Text>
                            <Text variant="bodyLarge" style={{color:colorScheme.text}}>{city}, {country}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </Surface>

            <Surface style={{marginTop:-30, backgroundColor:"white", borderRadius:30, padding:20,  width:"100%", display:"flex", justifyContent:"space-around", flex:1, borderBottomStartRadius:0, borderBottomEndRadius:0}}>
                <View style={styles.surface} >
                    <Text style={{color:"#cecece"}}> Percepitation </Text>
                    <Text style={{color:"#a3a3a3"}} variant="titleMedium">{weather.prec}%</Text>
                </View>
                <Divider/>
                <View style={styles.surface}>
                    <Text style={{color:"#cecece"}}> Wind </Text>
                    <Text style={{color:"#a3a3a3"}} variant="titleMedium">{weather.wind}km/h</Text>
                </View>
                <Divider/>
                <View style={styles.surface}>
                    <Text style={{color:"#cecece"}}> Humidity </Text>
                    <Text style={{color:"#a3a3a3"}} variant="titleMedium">{weather.humidity}%</Text>
                </View>

            </Surface>
            <Button icon="heart" style={{position:"absolute", top:20, right:20}} mode="elevated" textColor="green" onPress={e=>{db.insert({name:city, longitude:long, latitude:lat, country})}} disabled={db.savedCities.length >=4}> Save </Button>
       </>
             }
        </View>
            
    )
}


const styles = StyleSheet.create({
    text:{
        color:"#303345"
    },
    card: {
        marginTop:20,
        backgroundColor:"rgba(255,255,255,0.5)", 
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
    },
    avatarIcon : {
        backgroundColor:"white",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
    },
    title:{
        display:"flex",
        alignItems:"center"
    },
    bottomButtons:{
        position:"absolute",
        bottom:20,
        left:20,
        right:20,
        // backgroundColor:"rgba(255,255,255,0.5)", 
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
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