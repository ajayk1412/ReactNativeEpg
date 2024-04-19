import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import channels from './src/channelData.json';
import renderRowHeader from './src/RenderRowHeader';
import renderRowContent from './src/RenderRowContent';
import {DateHeader, RenderTimeSlot} from './src/components';
import {calculateAutoScrollLength} from './src/utils';

const App = () => {
  const scrollViewRef = useRef(null);
  const scrollViewHeaderRef = useRef(null);
  const [scrollX, setScrollX] = useState(null);

  const onLayout = () => {
    const pixels = calculateAutoScrollLength();
    scrollViewRef.current.scrollTo({x: scrollX + pixels, animated: false});
  };
  const {channelList} = channels;

  // Function to sync ScrollView B with ScrollView A
  const onScrollViewRef = event => {
    const scrollY = event.nativeEvent.contentOffset.x;
    scrollViewHeaderRef.current.scrollTo({x: scrollY, animated: false});
  };

  // Function to sync ScrollView A with ScrollView B
  const onScrollViewHeader = event => {
    const scrollY = event.nativeEvent.contentOffset.x;
    scrollViewRef.current.scrollTo({x: scrollY, animated: false});
  };

  return (
    <View key={`${scrollViewRef}`} style={styles.container}>
      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <DateHeader />
        <ScrollView
          horizontal
          ref={scrollViewHeaderRef}
          removeClippedSubviews
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollViewHeader}
          contentContainerStyle={styles.horizontal}>
          <RenderTimeSlot />
        </ScrollView>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.vertical}
        nestedScrollEnabled={false}
        removeClippedSubviews>
        <View>{channelList.map(renderRowHeader)}</View>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          onLayout={onLayout}
          removeClippedSubviews
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollViewRef}
          contentContainerStyle={styles.horizontal}>
          <View>{channelList.map(renderRowContent)}</View>
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
