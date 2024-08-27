import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import {  AESDecrypt,
          AESEncrypt,
          CaesarDecrypt,
          CaesarEncrypt,
          DESDecrypt,
          DESEncrypt,
          DHSharedKey,
          generateKeys,
          generateRandomKey,
          HillDecrypt,
          HillEncrypt,
          MD5Hash,
          MonoDecrypt,
          MonoEncrypt,
          PlayfairDecrypt,
          PlayfairEncrypt,
          PolyDecrypt,
          PolyEncrypt,
          RSADecrypt,
          RSAEncrypt,
          SHA1Hash} from '../crypto';
import * as Clipboard from 'expo-clipboard';

const KeyboardAvoidingComponent = () => {
    const params = useLocalSearchParams();
    const [outputText, setOutputText] = useState('');
    const [outputKeys, setOutputKeys] = useState('');
    const [inputText, onChangeInputText] = useState('');
    const [inputKey, onChangeInputKey] = useState(params.name==="Hill Cipher"?'GYBNQKURP':'');
    const [randomKey, onChangerandomKey] = useState('');
    const [p,onChangeP] = useState(params.name==="RSA"?'11':'');
    const [q,onChangeQ] = useState(params.name==="RSA"?'13':'');
    const [kA,setKa] = useState('');
    const [kB,setKb] = useState('');
    const [n,onChangeN] = useState('');
    const [ed,onChangeED] = useState('');

    const copyToClipboard = async () => {
      await Clipboard.setStringAsync(outputText);
    };

    function arePrimes(p, q) {
      const isPrime = (num) => {
        if (num <= 1) {
          return false;
        }
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) {
            return false;
          }
        }
        return true;
      };
        if(!isPrime(p)){
          alert(`${p} is not prime`);
          return false;
        }
        else if(!isPrime(q)){
          alert(`${q} is not prime`);
          return false;
        }
      return true;
    }

    const GenerateKeys =()=>{
      if(!p ||!q || p<11 || q<13) {
        alert("Please input primes p>10 and q>12");
      }else if(arePrimes(p,q)){
        const { publicKey, privateKey } = generateKeys(p, q);
    const publicKeyString = `Public Key: {${JSON.stringify(publicKey.n)}, ${JSON.stringify(publicKey.e)}}`;
    const privateKeyString = `Private Key: {${JSON.stringify(privateKey.n)}, ${JSON.stringify(privateKey.d)}}`;
    const combinedKeys = `${publicKeyString}\n${privateKeyString}`;
        setOutputKeys(combinedKeys);
      }
    }
    const Encrypt = async () => {
    let res;
      switch (params.name) {
        case "Caesar Cipher":
          res=  await CaesarEncrypt(inputText,inputKey);
          break;

          case "Hill Cipher":
              if(!inputKey || inputKey.length <9 || inputKey.length >9) {
                alert("Please input a key of length 9");
              }else{
                res=  await HillEncrypt(inputText.toUpperCase(),inputKey.toUpperCase());
              }
              break;
        case "Mono alphabetic Cipher":
          if(!randomKey) {
            alert("Please generate a random key");
          }else{

            res=  await MonoEncrypt(inputText,randomKey);
          }
          break;

        case "Vigenere Cipher":
          if(!inputKey) {
            alert("Please input a key");
          }else{

            res=  await PolyEncrypt(inputText.toUpperCase(),inputKey.toUpperCase());
          }
          break;

        case "PlayFair Cipher":
          if(!inputKey) {
            alert("Please input a key");
          }
          else{

            res=  await PlayfairEncrypt(inputText.toUpperCase(),inputKey.toUpperCase());
          }
          break;

        case "DES":
          if(!inputKey) {
            alert("Please input a key");
          }else{

            res=  await DESEncrypt(inputText,inputKey);
          }
          break;

        case "AES":
          if(!inputKey) {
            alert("Please input a key");
          }else{

            res=  await AESEncrypt(inputText,inputKey);
          }
          break;

        case "RSA":
          if(!n || !ed) {
            alert("Please input the key");
          }else{

            res=  await RSAEncrypt(inputText,n,ed);
          }
          break;

        case "Diffie Hellman":
          if(!p || !q || !n || !ed) {
            alert("Please input the keys");
          }else  if(arePrimes(p,q)){

            const [ka,kb,sharedKey] = await DHSharedKey(p,q,n,ed);
            setKa(ka);
            setKb(kb);
            res=sharedKey;
          }
          break;

          case "MD-5":
            res= await MD5Hash(inputText);
          break;

          case "SHA-1":
            res= await SHA1Hash(inputText);
          break;

        default: console.log("Check Algorithm Name")
          break;
      }

      setOutputText(res);

    };

    const Decrypt = async () => {
      let res;
        switch (params.name) {
          case "Caesar Cipher":
            res=  await CaesarDecrypt(inputText,inputKey);
            break;

            case "Hill Cipher":
              if(!inputKey || inputKey.length <9 || inputKey.length >9) {
                alert("Please input a key of length 9");
              }else{
                res=  await HillDecrypt(inputText.toUpperCase(),inputKey.toUpperCase());
              }
              break;

            case "Mono alphabetic Cipher":
              if(!randomKey) {
                alert("Please generate a random key");
              }else{
                res=  await MonoDecrypt(inputText.toUpperCase(),randomKey);
              }
              break;

              case "Vigenere Cipher":
              if(!inputKey) {
                alert("Please input a  key");
              }else{

                res=  await PolyDecrypt(inputText.toUpperCase(),inputKey.toUpperCase());
              }
              break;

              case "PlayFair Cipher":
              if(!inputKey) {
                alert("Please input a  key");
              }else{

                res=  await PlayfairDecrypt(inputText,inputKey);
              }
              break;

              case "DES":
              if(!inputKey) {
                alert("Please input a  key");
              }else{

                res=  await DESDecrypt(inputText,inputKey);
              }
              break;

              case "AES":
              if(!inputKey) {
                alert("Please input a  key");
              }else{

                res=  await AESDecrypt(inputText,inputKey);
              }
              break;

              case "RSA":
                if(!n || !ed) {
                  alert("Please input the key");
                }else{

                  res=  await RSADecrypt(inputText,n,ed);
                }
                break;

              default: console.log("Check Algorithm Name")
                break;
        }

        setOutputText(res);

      };

  return (
    <>
    <Stack.Screen
options={{
  title: params.name,
  headerTintColor: '#1f2f6a',
headerTitleStyle: {
  fontWeight: 'bold',
},
}}
/>
<KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <ScrollView>
      <View style={styles.inner}>
      { (["RSA","Diffie Hellman"].some(value => params.name.includes(value))) && <>
       <Text className="text-xl p-3 font-bold text-[#1f4c6a]">{params.name==="Diffie Hellman"?"Public Keys for A & B(Primes)":"Input Primes"}</Text>
         <View className="flex flex-row gap-10">
            <TextInput
              editable
              placeholder='Enter a Prime P'
              onChangeText={text => onChangeP(text)}
              value={p}
              keyboardType='numeric'
              style={{
                marginBottom: 12,
                borderBottomWidth: 1,
                padding:10,
                elevation:3,
                fontSize: 18,
                backgroundColor:'#fff',
                borderRadius: 10,
              }}
            />
            <TextInput
              editable
              placeholder="Enter a Prime Q"
              onChangeText={text => onChangeQ(text)}
              value={q}
              keyboardType='numeric'
              style={{
                marginBottom: 12,
                borderBottomWidth: 1,
                padding:10,
                elevation:3,
                fontSize: 18,
                backgroundColor:'#fff',
                borderRadius: 10,
              }}
            />
            </View></>}
            {params.name==="RSA" &&
            <>
            <View className=" items-end p-3">
                <Button title="Generate" color={'#1f2f6a'} onPress={() => GenerateKeys()} />
                </View>
            <Text className="text-xl p-3 font-bold text-[#1f2f6a]">keys</Text>
            <Text

            style={styles.textInput}
          >{outputKeys}</Text></>}

{params.name!=="Diffie Hellman" &&<>
            <Text className="text-xl p-3 font-bold text-[#1f2f6a]">Output</Text>
            <Text
            style={styles.textInput}
          >{outputText}</Text>
                <View className=" items-end p-3">
                <Button title="Copy Text" color={'#1f2f6a'} onPress={() => copyToClipboard()} />
                </View>
                </>}
          </View>
      <View style={styles.inner}>
                {(params.name=="Mono alphabetic Cipher") &&<View>
                <TextInput
                editable={false}
                multiline
                numberOfLines={4}
                maxLength={26}
                value={randomKey}
                style={styles.textInput}
              />
                    <View className=" items-center p-2">
                    <Button title="Generate Random key" color={'#1f2f6a'} onPress={() =>onChangerandomKey(generateRandomKey())} />
                    </View>
                </View>}
                {params.name!=="Diffie Hellman" &&
                <>
                <Text className="text-xl p-3 font-bold text-[#1f4c6a]">Input Text</Text>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={100}
              placeholder='Enter Text'
              onChangeText={text => onChangeInputText(text)}
              value={inputText}
              style={styles.textInput}
            /></>}

           {(["RSA","Diffie Hellman"].some(value => params.name.includes(value))) &&
            <>
            <Text className="text-xl p-3 font-bold text-[#1f4c6a]">{params.name==="Diffie Hellman"?"Private Keys for A & B":"Input Public/Private Key"}</Text>
           <View className="flex flex-row gap-10">
            <TextInput
              editable
              placeholder={params.name==="Diffie Hellman"?"":"n"}
              onChangeText={text => onChangeN(text)}
              value={n}
              keyboardType='numeric'
              style={{
                marginBottom: 12,
                borderBottomWidth: 1,
                padding:10,
                width:'40%',
                elevation:3,
                fontSize: 24,
                backgroundColor:'#fff',
                borderRadius: 10,
              }}
            />
            <TextInput
              editable
              placeholder={params.name==="Diffie Hellman"?"":"e / d"}
              onChangeText={text => onChangeED(text)}
              value={ed}
              keyboardType='numeric'
              style={{
                marginBottom: 12,
                borderBottomWidth: 1,
                width:'40%',
                padding:10,
                elevation:3,
                fontSize: 24,
                backgroundColor:'#fff',
                borderRadius: 10,
              }}
            />
            </View></>}
            { params.name==="Diffie Hellman" &&
            <>
            <Text className="text-xl p-3 font-bold text-[#1f4c6a]">Shared Key</Text>
            <Text
              style={{
                marginBottom: 12,
                borderBottomWidth: 1,
                padding:10,
                elevation:3,
                fontSize: 24,
                backgroundColor:'#fff',
                borderRadius: 10,
              }}
            >{outputText}</Text>
            </>}
           {(["Caesar Cipher","Vigenere Cipher","Hill Cipher","PlayFair Cipher","DES","AES"].some(value => params.name.includes(value))) && <TextInput
              editable
              placeholder={params.name === "Caesar Cipher" ? 'Enter No. of Shifts' : params.name === "Hill Cipher" ? 'Enter 9 Letter Keyword' : 'Enter Keyword'}
              onChangeText={text => onChangeInputKey(text)}
              value={inputKey}
              keyboardType={params.name=="Caesar Cipher"? 'numeric':null}
              style={{
                marginBottom: 12,
                borderBottomWidth: 1,
                padding:10,
                elevation:3,
                fontSize: 24,
                backgroundColor:'#fff',
                borderRadius: 10,
              }}
            />}
                  <View className="flex flex-row w-full justify-between p-5">
                    <Button title={(params.name!=="Diffie Hellman") ?"Encrypt":"Submit"} color={'green'} onPress={() => Encrypt()} />
                    {params.name!=="Diffie Hellman" &&<Button title="Decrypt" color={'red'} onPress={() => Decrypt()} />}
                  </View>
            </View>
  </ScrollView>
  </TouchableWithoutFeedback>
</KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  textInput: {
    height:100,
    marginBottom: 12,
    borderBottomWidth: 1,
    padding:10,
    elevation:3,
    fontSize: 24,
    backgroundColor:'#fff',
    borderRadius: 10,
  },
});

export default KeyboardAvoidingComponent;