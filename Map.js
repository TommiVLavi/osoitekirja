import { StyleSheet, Text, View, Button, TextInput ,FlatList, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { useEffect, useState } from 'react';
import { APIKEY } from '@env'

export default function MapScreen({ route, navigation }) {
    const init = {
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    }

    const [region, setRegion] = useState(init)
    
    const address = route.params;

    useEffect(() => {
        console.log('Tuli perille ' + address)
        fetching(address)
    })

    const fetching = async (address) => {
        console.log("Haetaan kartalta ")
        const KEY = process.env.APIKEY || Constants.manifest.extra.APIKEY;
        const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`
        
        try {
            const resp = await fetch(url)
            const data = await resp.json()
  
            const { lat, lng } = data.results[0].locations[0].latLng
  
            setRegion({ ...region, latitude: lat, longitude: lng })
            console.log('Haettu')
  
        } catch (error) {
            console.error("Meni umpeen", error.message);
        }
  
        Keyboard.dismiss();
    }

    return(
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
            >
                <Marker coordinate={region} />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        flex:1,
        width: '100%',
        height: '100%'
    },
  });