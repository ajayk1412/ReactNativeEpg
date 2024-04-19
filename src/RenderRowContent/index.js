import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {
  addingMissingEPG,
  calculateTimeDifferenceInMinutes,
  isActiveCell,
} from '../utils';

const RenderRowContent = channel => {
  const {epg} = channel;
  console.log('epg length', epg.length);
  const parseEPG = addingMissingEPG(epg);
  return (
    <View key={channel?.id} style={styles.viewRow}>
      {parseEPG.map(renderCell)}
    </View>
  );
};

const renderCell = item => {
  const totalMinutes = calculateTimeDifferenceInMinutes(
    item?.startTime,
    item?.endTime,
  );
  const cellWidth = totalMinutes * 3;
  const activeCell = isActiveCell(item);

  return (
    <View key={`${item?.id}`} style={styles.viewCell(cellWidth, activeCell)}>
      <Text style={styles.title(activeCell)} numberOfLines={1}>
        {item?.title}
      </Text>
      <Text style={styles.title(activeCell)} numberOfLines={1}>
        {item?.epgSlotId && `${totalMinutes} m`}
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
  viewCell: (cellWidth, activeCell) => ({
    width: cellWidth,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#E8E5EC',
    backgroundColor: activeCell ? '#220046' : 'white',
  }),
  title: activeCell => ({
    fontSize: 14,
    paddingHorizontal: 5,
    paddingTop: 8,
    color: activeCell ? 'white' : 'black',
  }),
});
