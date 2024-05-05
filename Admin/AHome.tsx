import {View, Text, Dimensions, Modal} from 'react-native';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView, Image} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Circle} from 'react-native-animated-spinkit';
import {useEffect, useState} from 'react';
import {Socket, io} from 'socket.io-client';
import Modals from './AComponent/Modal';
// 9631086222
function AHome() {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [visible, setVisible] = useState(true);
  const [isErro, setError] = useState(false);
  const [text, setText] = useState('');
  const [data, setData] = useState<any>(undefined);
  const navigator = useNavigation();
  const [image, setImages] = useState<any>('');
  const [message, setMessage] = useState<number>(0);

  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: '#F1F5F9',
      }}>
      <ScrollView>
        <View
          style={{
            padding: 10,
            marginTop: 28,
            backgroundColor: '#F1F5F9',
          }}>
          <View
            style={{
              width: '100%',
              height: 200,
              backgroundColor: 'white',
              elevation: 3,
              shadowColor: '#94A3B8',
              // backgroundColor: "#E2E8F0",
              // borderRadius: 50,
              flexDirection: 'column',
              marginBottom: 10,
              borderRadius: 10,
              // borderBottomLeftRadius: 50,
              // borderBottomRightRadius: 50,
            }}>
            <View
              style={{
                position: 'absolute',
                marginTop: 50,
                marginLeft: 10,
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: image}}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100 / 2,
                  borderWidth: 2,
                  backgroundColor: 'gray',
                  borderColor: 'gray',
                }}
              />
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                {'ADMIN'}
              </Text>
            </View>
          </View>
        </View>
        {/* 1st part */}
        <View style={styles.flexdata}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              navigator.navigate('Sealecting');
            }}>
            <Image
              source={require('../assets/annoucment.png')}
              style={{
                width: 100,
                height: 100,
                top: -10,
              }}
            />

            {/* </View> */}
            {/* <Icon name="campaign" size={30} color="#000" /> */}
            <Text style={styles.text}>Annoucment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Image
              source={require('../assets/user.png')}
              style={{
                width: 70,
                height: 70,
                top: -10,
              }}
            />
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate('ID Card');
            }}
            style={styles.box}>
            <Image
              source={require('../assets/idcard.png')}
              style={{
                width: 70,
                height: 70,
                top: -10,
              }}
            />
            <Text style={styles.text}>ID Card</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 30}}></View>
      </ScrollView>
    </View>
  );
}

export default AHome;

const styles = StyleSheet.create({
  box: {
    width: '30%',
    maxWidth: 110,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F1F5F9',
    elevation: 6,
    shadowColor: '#94A3B8',
  },
  flexdata: {
    width: '100%',
    height: 100,
    marginTop: '3%',
    backgroundColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'white',
  },
  botomTap: {
    height: '95%',
    width: '24.6%',
    borderRadius: 5,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: 'gray',
    position: 'absolute',
    bottom: 10,
  },
});
