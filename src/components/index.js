import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {generateTimeSlots} from '../utils';

export const DateHeader = () => {
  function getDayName(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {weekday: 'short'}).toUpperCase();
  }
  return (
    <TouchableOpacity
      style={{
        width: 80,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{color: '#E10092'}}>{`${getDayName(new Date())}`}</Text>
    </TouchableOpacity>
  );
};

export const renderTimeRow = value => {
  return (
    <View
      key={value}
      style={{
        height: 25,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 90,
      }}>
      <Text style={{fontSize: 12, color: '#424242'}}>{value}</Text>
    </View>
  );
};

export const RenderTimeSlot = () => {
  const timeSlotsArray = generateTimeSlots();
  return (
    <View style={{flexDirection: 'row'}}>
      {timeSlotsArray.map(renderTimeRow)}
    </View>
  );
};

const styles = StyleSheet.create({});
