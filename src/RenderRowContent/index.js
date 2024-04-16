import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {calculateTimeDifferenceInMinutes} from '../utils';

const RenderRowContent = channel => {
  const {epg} = channel;
  return (
    <View key={channel?.id} style={styles.viewRow}>
      {epg.map(renderCell)}
    </View>
  );
};

const renderCell = item => {
  const totalMinutes = calculateTimeDifferenceInMinutes(
    item?.startTime,
    item?.endTime,
  );
  const cellWidth = totalMinutes * 3;
  return (
    <View key={`${item?.id}`} style={styles.viewCell(cellWidth)}>
      <Text style={styles.title} numberOfLines={1}>
        {item?.title}
      </Text>
      <Text style={styles.title} numberOfLines={1}>
        {`${totalMinutes} m`}
      </Text>
    </View>
  );
};

export default RenderRowContent;

const styles = StyleSheet.create({
  viewRow: {
    borderWidth: 1,
    height: 79,
    borderColor: '#E8E5EC',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  viewCell: cellWidth => ({
    width: cellWidth,
    borderRightWidth: 1,
    borderColor: '#E8E5EC',
  }),
  title: {fontSize: 14, paddingHorizontal: 5, paddingTop: 8},
});
