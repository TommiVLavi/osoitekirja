import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput ,FlatList, Keyboard } from 'react-native';
import { Button, Input, ListItem, Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite'

export default function ListScreen({ navigation }) {
    
    const [address, setAddress] = useState('')
    const [data, setData] = useState([])

    const db = SQLite.openDatabase('shoppinglist.db')

    
    useEffect(() => {
        console.log('Luotu')
        db.transaction(tx => {
          tx.executeSql('create table if not exists addList (id integer primary key not null, address text);')
        }, null, updateIt
        )
      }, [])


    const saveIt = () => {
        console.log('Tallennus')
        db.transaction(
            tx => {
              tx.executeSql('insert into addList (address) values (?);', [address])
            }, console.log("Ei tallennettu"), updateIt
          )
    }


    const updateIt = () => {
        console.log('Paivitys')
        db.transaction(
            tx => {
              tx.executeSql('select * from addList;', [], (_, { rows }) => {
                setData(rows._array);
                setAddress('');
                Keyboard.dismiss();
              })
            })
    }


    const deleteIt = (id) => {
        console.log("Poistaa")
        db.transaction(
          tx => {
            tx.executeSql('delete from addList where id = ?;', [id]);
          },
          null, updateIt
        )
    }


    const test = () => {
        console.log('Painettu')
    }

    
    const renderItem = ({ item }) => (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title 
            onPress={() => navigation.navigate('Kartta', item.address)} 
            onLongPress={deleteIt} 
            style={{fontSize: 20}} >{item.address}</ListItem.Title>
        </ListItem.Content>

        <Icon 
                  onPress={(() => deleteIt(item.id))}
                  name='remove'
                  size={35}
                  color='blue'
                  />

        <ListItem.Chevron color="grey" size={30} />
      </ListItem>
    )
    
    return(
        <View>
            <Input
                label="Osoite"
                placeholder='Laittaisitko , kiitos'
                onChangeText={text => setAddress(text)}
            />

            <Button
                buttonStyle={{ width: 150, margin: 20, padding: 5 }}
                title="Tallenna"
                onPress={saveIt}
                icon={{ name: 'save', size: 28, color:'white', margin:4}}
                
            />

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={data}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },

})