import { Fragment, useState } from "react"
import { Pressable, ScrollView, StyleSheet, View } from "react-native"
import { ActivityIndicator, Card, Divider, Icon, IconButton, Searchbar, Surface, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import testResults from "./devResults.json"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { WeatherView } from "../components/WeatherView"


const Stack = createNativeStackNavigator();

const Search = ({navigation, route}) => {
    const [city, setCity] = useState("")
    const [results, setResults] = useState(testResults.results)
    const [searching, setSearching] = useState(false)

    const initiateSearch = () => {
        setSearching(true)
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`).then(res=>res.json()).then(data => {setResults(data.results), setSearching(false)})
    }

    const handleCityPress = (cityInfo) => {
        console.log(cityInfo)
        navigation.push('City Weather', cityInfo)
    }
    return (
        <View style={{ flex:1}}>
            {searching ? <ActivityIndicator style={{flex:1}}/> :
            <ScrollView style={{padding:20, backgroundColor:"white"}}>
                {
                    results.map((res,i) => (
                        <Fragment key={i}>
                            <Pressable style={{paddingHorizontal:20, paddingVertical:20, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}} onPress={e=>handleCityPress(res)}>
                                <View>
                                    <Text style={{color:"#303345"}}  variant="titleMedium">{res.name}</Text>
                                    <Text style={{color:"#cecece"}}>{res.admin1}, {res.country}</Text>
                                </View>
                                <IconButton icon="heart-outline" size={15} color="#a3a3a3" onPress={(e)=>{console.log(e)}}/>
                            </Pressable>
                            <Divider/>
                        </Fragment>
                    ))
                }
            </ScrollView>

            }
            <Searchbar style={styles.search} value={city} onChangeText={setCity} onSubmitEditing={initiateSearch}/>
        </View>
    )
}

const CityWeather = ({route, navigation}) => {
    console.log(route.params)
    return (
        <WeatherView long={route.params.longitude} lat={route.params.latitude} city={route.params.name} country={route.params.country}/>
    )
}

export const SearchScreen = () => {    

    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Search" component={Search}/>
            <Stack.Screen name="City Weather" component={CityWeather}/>
            
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    search:{
        position:"absolute",
        bottom:10,
        left:10,
        right:10,
    }
})