import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Video, {VideoRef} from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

const App = () => {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [mute, setMute] = useState(false);
  const ref = useRef();
  const formate = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  const handleFullscreen = () => {
    fullScreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  };
  return (
    <TouchableOpacity
      style={{width: '100%', height: 230, flex: 1}}
      onPress={() => {
        setClicked(!clicked);
      }}>
      <Video
        paused={paused}
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        ref={ref}
        onProgress={x => {
          // console.log('video', x);
          setProgress(x);
        }}
        style={{width: '100%', height: 230, flex: 1}}
        resizeMode="contain"
        // controls={true}
        // resizeMode={'cover'}
        muted={mute}
      />

      {clicked && (
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                ref.current.seek(parseInt(progress.currentTime) - 10);
              }}>
              <Image
                source={require('./src/assets/backward.png')}
                style={{height: 40, width: 40, tintColor: 'white'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPaused(!paused);
              }}>
              <Image
                source={
                  paused
                    ? require('./src/assets/play-button.png')
                    : require('./src/assets/pause.png')
                }
                style={{
                  height: 40,
                  width: 40,
                  tintColor: 'white',
                  marginLeft: 50,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ref.current.seek(parseInt(progress.currentTime) + 10);
              }}>
              <Image
                source={require('./src/assets/forward.png')}
                style={{
                  height: 40,
                  width: 40,
                  tintColor: 'white',
                  marginLeft: 50,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>
              {formate(progress.currentTime)}
            </Text>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={progress.seekableDuration}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={x => {
                ref.current.seek(x);
              }}
            />
            <Text style={{color: 'white'}}>
              {formate(progress.seekableDuration)}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              top: 10,
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                handleFullscreen();
                setFullScreen(!fullScreen);
              }}>
              <Image
                source={
                  fullScreen
                    ? require('./src/assets/minimize.png')
                    : require('./src/assets/full-size.png')
                }
                style={{width: 30, height: 30, tintColor: 'white'}}
                
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMute(!mute)}>
              <Image
                source={
                  mute
                    ? require('./src/assets/mute.png')
                    : require('./src/assets/medium-volume.png')
                }
                style={{width: 30, height: 30, tintColor: 'white'}}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default App;
