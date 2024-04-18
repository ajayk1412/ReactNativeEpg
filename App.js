import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import channels from './src/channelData.json';
import renderRowHeader from './src/RenderRowHeader';
import renderRowContent from './src/RenderRowContent';
import {DateHeader, RenderTimeSlot, renderTimeRow} from './src/components';
import {calculateAutoScrollLength} from './src/utils';

const App = () => {
  const [scrollX, setScrollX] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const xScroll = calculateAutoScrollLength();
      scrollByPixels(xScroll);
    }, 500);
  }, []);

  const handleScroll = event => {
    setScrollX(event.nativeEvent.contentOffset.x);
  };

  const scrollByPixels = pixels => {
    scrollViewRef.current.scrollTo({x: scrollX + pixels});
  };
  const {channelList} = channels;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.vertical}
        removeClippedSubviews>
        <View>
          <DateHeader />
          {channelList.map(renderRowHeader)}
        </View>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          removeClippedSubviews
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
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
