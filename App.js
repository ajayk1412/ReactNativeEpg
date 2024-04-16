import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import channels from './src/channelData.json';
import renderRowHeader from './src/RenderRowHeader';
import renderRowContent from './src/RenderRowContent';
import {DateHeader, RenderTimeSlot, renderTimeRow} from './src/components';

const App = () => {
  const {channelList} = channels;
  console.log('channels:::', channelList);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.vertical} removeClippedSubviews>
        <View>
          <DateHeader />
          {channelList.map(renderRowHeader)}
        </View>
        <ScrollView
          horizontal
          removeClippedSubviews
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontal}>
          <View>
            <RenderTimeSlot />
            {channelList.map(renderRowContent)}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 60, backgroundColor: '#220046'},
  vertical: {
    flexDirection: 'row',
    backgroundColor: '#220046',
  },
  horizontal: {
    flexDirection: 'column',
    backgroundColor: 'yellow',
    width: 4320,
  },
});
