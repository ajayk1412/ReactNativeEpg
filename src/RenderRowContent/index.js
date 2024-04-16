import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {calculateTimeDifferenceInMinutes} from '../utils';

const RenderRowContent = channel => {
  const {epg} = channel;
  console.log('epg:::', epg);
  return (
    <View
      key={channel?.id}
      style={{
        borderWidth: 1,
        height: 79,
        borderColor: '#E8E5EC',
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      {epg.map(renderCell)}
    </View>
  );
};

const renderCell = item => {
  const totalMinutes = calculateTimeDifferenceInMinutes(
    item?.startTime,
    item?.endTime,
  );
  const cellWidth = Math.floor(totalMinutes / 30);
  return (
    <View
      key={`${item?.id}`}
      style={{
        width: 3 * totalMinutes,
        borderRightWidth: 1,
        borderColor: '#E8E5EC',
      }}>
      <Text
        style={{fontSize: 14, paddingHorizontal: 5, paddingTop: 8}}
        numberOfLines={1}>
        {item?.title}
      </Text>
      <Text
        style={{fontSize: 14, paddingHorizontal: 5, paddingTop: 16}}
        numberOfLines={1}>
        {`${totalMinutes} min`}
      </Text>
    </View>
  );
};

export default RenderRowContent;

const styles = StyleSheet.create({});
