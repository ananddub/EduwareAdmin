import {useState} from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';
function Modals({
  text,
  visible,
  setVisible,
}: {
  text: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
}) {
  return (
    <Modal
      animationType="fade"
      visible={visible}
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
        <View
          style={{
            width: '100%',
            // height: 150,
            backgroundColor: '#F1F5F9',
            flexDirection: 'Column',
            borderRadius: 20,
            justifyContent: 'space-around',
            paddingHorizontal: 20,
            paddingVertical: 10,
            gap: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: '#4B5563',
              textAlign: 'center',
            }}>
            {text}
          </Text>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              width: 200,
              height: 50,

              backgroundColor: '#FF3E03',
              borderRadius: 25,
              elevation: 32,
              shadowColor: '#FF3E03',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '400',
                color: 'white',
                textAlign: 'center',
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default Modals;
