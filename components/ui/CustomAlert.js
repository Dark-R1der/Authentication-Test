// CustomAlert.js
import React from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';

const CustomAlert = ({ visible, onClose, message }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: 300,
          }}
        >
          <Icon
            name="close"
            type="material"
            size={24}
            onPress={onClose}
            style={{ alignSelf: 'flex-end' }}
          />
          <Text style={{ marginBottom: 20 }}>{message}</Text>
          <Button title="OK" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
