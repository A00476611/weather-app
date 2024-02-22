import { Icon, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { View } from "react-native"

export const WeatherView = ({long, lat, city="Halifax"}) => {
    return (
        <View style={{paddingHorizontal:20, paddingVertical:20}} >
            <Text>
                <Text variant="headlineMedium">{city}</Text>
                <Icon  source="map-marker" size={20}/>
            </Text>

        </View>
    )
}