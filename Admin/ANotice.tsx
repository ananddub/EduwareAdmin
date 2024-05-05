import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import SelectDropdown from 'react-native-select-dropdown';
import DropDown from './AComponent/DropwDown';
import {io} from 'socket.io-client';

import Modals from './AComponent/Modal';
import {Circle} from 'react-native-animated-spinkit';
// const url = 'https://reactnativebackendnew.onrender.com';
// const url = 'http://192.168.1.6:4000';
const url = 'http://3.110.47.78:4000';

// const url = 'https://reactnativebackendnew.onrender.com';

const socket = io(url);
function ANotice(): JSX.Element {
  const {width, height, scale} = useWindowDimensions();
  const [tfocus, setTfocus] = useState<boolean>(false);
  const classarr = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII',
  ];
  const secarr = [
    'ALL',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const [option, setOption] = useState<number>(-1);
  const [emsgVisible, setEmsgVisible] = useState<boolean>(false);
  const [msg, setMessage] = useState<string>('');
  const [textmsg, setTextMsg] = useState<string>('');
  const [classValue, setclassValue] = useState<number>(-1);
  const [succes, setSucces] = useState<boolean>(false);
  const [secValue, setSecValue] = useState<number>(-1);
  const [admno, setAdmno] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [eFlags, setEFlags] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(true);
  useEffect(() => {
    const socket = io(url);
    socket.emit('getAdminChat');
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('getAdminStatus', (data: any) => {
      console.log('got admin status');
      socket.emit('getAdminChat');
    });
    socket.on('getAdminChat', (msgvalue: any) => {
      setMessage(msgvalue.data);
      console.log('is array', Array.isArray(msgvalue.data));
      setSpin(false);
    });
    return () => {
      socket.off('getAdminChat');
      socket.off('getAdmitStatus');
    };
  }, []);

  useEffect(() => {
    setError('');
  }, [option, classValue, secValue, admno]);
  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: 'white',
        flex: 1,
        gap: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
      }}>
      <Modal
        animationType="fade"
        visible={spin}
        transparent={true}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            paddingHorizontal: 30,
          }}>
          <Circle size={80} color="white"></Circle>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          flex: 2.8,
          paddingHorizontal: 10,
        }}>
        <FlatList
          data={msg}
          renderItem={({item}: {item: any}) => {
            console.log('new ', item);
            let formattedDate = '';
            try {
              let dateStr = item?.date;
              let date = new Date(item.date);
              formattedDate = date.toISOString().split('T')[0];
              console.log('formdata :', formattedDate);
            } catch (err: any) {
              console.log('error :', err.message);
            }
            return (
              <View
                style={{
                  borderRadius: 10,
                  marginVertical: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: '#E9ECEF',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <View
                  style={{
                    flex: 2,
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      columnGap: 20,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    To {item.name !== null ? item.name : item.to}
                  </Text>
                  {item.name !== null && (
                    <>
                      <View
                        style={{
                          width: '120%',
                          marginTop: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            flex: 1,
                            columnGap: 20,
                            fontSize: 12,
                            fontWeight: '500',
                          }}>
                          class {item.mclass}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            flex: 1,
                            columnGap: 20,
                            fontSize: 12,
                            fontWeight: '500',
                          }}>
                          section {item.msec}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            flex: 1,
                            columnGap: 20,
                            fontSize: 12,
                            fontWeight: '500',
                          }}>
                          roll {item.mroll}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: 'black',
                          flex: 1,
                          top: -10,
                          columnGap: 20,
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                        father's Name {item.fname}
                      </Text>
                    </>
                  )}
                  <Text style={{color: 'black'}}>{item.message}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    width: '100%',
                    flexDirection: 'row',
                    columnGap: 10,
                  }}>
                  <Text style={{color: 'black', textAlign: 'right'}}>
                    {item.time}
                  </Text>
                  <Text style={{color: 'black', textAlign: 'right'}}>
                    {formattedDate}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
export default ANotice;
