import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RenderRowHeader = channel => {
  return (
    <View key={channel?.id} style={styles.vwContainer}>
      <Image
        source={{
          uri: channel?.thumbnailImage,
        }}
        style={styles.imgStyle}
      />

      <Text>{channel?.channelNumber}</Text>
    </View>
  );
};

export default RenderRowHeader;

const styles = StyleSheet.create({
  vwContainer: {
    borderWidth: 1,
    alignItems: 'center',
    width: 80,
    paddingVertical: 5,
    borderColor: '#E8E5EC',
    backgroundColor: 'white',
  },
  imgStyle: {
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 50,
  },
});
