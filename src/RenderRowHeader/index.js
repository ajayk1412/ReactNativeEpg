import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RenderRowHeader = channel => {
  console.log('props:::', channel);
  return (
    <View
      key={channel?.id}
      style={{
        borderWidth: 1,
        alignItems: 'center',
        width: 80,
        paddingVertical: 5,
        borderColor: '#E8E5EC',
        backgroundColor: 'white',
      }}>
      <Image
        source={{
          uri: channel?.thumbnailImage,
        }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'grey',
          borderRadius: 50,
        }}
      />

      <Text>{channel?.channelNumber}</Text>
    </View>
  );
};

export default RenderRowHeader;

const styles = StyleSheet.create({});
