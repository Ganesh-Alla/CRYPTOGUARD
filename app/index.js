import React from 'react';
import { FlatList, Image,  SafeAreaView,  StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import Lock from '../assets/main.jpeg'
import Icon from 'react-native-vector-icons/AntDesign';

const lists = [
  {name:"Caesar Cipher",key:1},
  {name:"Hill Cipher",key:2},
  {name:"Mono alphabetic Cipher",key:3},
  {name:"Vigenere Cipher",key:4},
  {name:"PlayFair Cipher",key:5},
  {name:"DES",key:6},
  {name:"AES",key:7},
  {name:"RSA",key:8},
  {name:"Diffie Hellman",key:9},
  {name:"SHA-1",key:10},
  {name:"MD-5",key:11},
]


const App = () => {
  return (
<>
<SafeAreaView style={{ flex: 1 }}>
   <View className="m-4">
         <View style={[styles.boxShadow,styles.container]}>
           <Image
            style={[styles.image]}
            source={Lock}
          />
        </View>
      </View>
      <Text style={styles.headline} className="border-b-4 pb-4  border-b-blue-950 ">Choose One Cryptography Algorithm:</Text>
<FlatList
        contentContainerStyle={styles.listContainer}
        numColumns='2'
        horizontal={false}
        key={'#'}
        keyExtractor={item => "#" + item.key}
        data={lists}
        renderItem={({item}) => (
          <Link href={{ pathname: 'details', params: { name: item.name,key:item.key } }} style={styles.button} >
            <View className="flex flex-row  h-full bg-blue-950 justify-between items-center py-2 px-1 border border-blue-500 rounded-lg " style={{minWidth:150}}>
              <Text className=" font-bold max-w-[120px] min-h-[50px] text-sm py-2 text-white">{item.name}</Text>
              <Icon name="rightcircleo" className=" ml-5 p-2" size={25}  color="#fff" />
            </View>
          </Link>
        )}
        />
   </SafeAreaView>
</>
  )}

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    height: 200,
    marginBottom:32
  },
  boxShadow: {
    shadowColor: '#333333',
    elevation: 5,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  headline: {
    fontSize: 20,
    marginBottom:5,
    fontWeight: 'bold',
  },
  button: {
    minWidth:150,
    borderRadius: 5,
    marginHorizontal:40,
    marginVertical:10,
  },
  listContainer: {
    flexGrow: 1,
    alignItems:'center',
  },
});
