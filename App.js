import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor, CameraPosition } from 'react-native-vision-camera';
import { scanOCR } from 'vision-camera-ocr';

export default function App() {

  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('front')
  const [isFlahOn, setIsFlahOn] = useState(false)

  const devices = useCameraDevices()
  const device = cameraPosition == 'front' ? devices.front : devices.back
  const frameProcessor = useFrameProcessor( (frame) => {
    'worklet'
  }, [])

  function handleToggleCameraPosition(){
    setCameraPosition(prevState => prevState == 'front' ? 'back' : 'front')
  }

  function handleToggleFlash(){
    if(cameraPosition === 'front'){
      return Alert.alert('Flash', 'Aviso! Troque para a câmera traseira.')
    }
    setIsFlahOn(prevState => !prevState)
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera}
        isActive={true}
        device={device}
        torch={isFlahOn ? 'on' : 'off'}
        frameProcessor={frameProcessor}
      >
        <View>
          <Button 
            icon={'flip-camera-ios'}
            onPress={handleToggleCameraPosition}
          />
          <Button
            icon={isFlahOn ? 'flash-on' : 'flah-off'}
            onPress={handleToggleFlash}
          />
        </View>
      </Camera>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera:{
    flex: 1,
  }
});
