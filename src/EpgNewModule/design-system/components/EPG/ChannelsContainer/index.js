import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';

import {
  ChannelsLeftBar,
  ChannelSchedulesContainer,
} from '../../../components/EPG';
import {styles} from './styles';
import {ballyNormalizeWidth} from 'utils/responsivev2';
import {showAlert} from 'utils/commonMethods';
import {endWatchParty} from '../../../../../Home/WatchParty/BottomTabs/WatchPartyTab/watchPartyHelper';
// import translate from 'translations';

export const ChannelsContainer = ({
  channels,
  onChannelChange,
  isToday,
  channelDetail,
  currentChannelIndex,
}) => {
  const watchPartyData = useSelector(state => state.watchPartyData);

  const verticalScrollRef = useRef(null);

  const [leftBarCardWidth, setLeftBarCardWidth] = useState(0);
  const [leftBarCardHeight, setLeftBarCardHeight] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(currentChannelIndex);
  }, [currentChannelIndex]);

  const handleSelectedChannel = (index, item) => {
    setCurrentIndex(index);
    onChannelChange(item);
  };

  const handleGetLeftCardLayout = ({width, height}) => {
    setLeftBarCardWidth(width);
    setLeftBarCardHeight(height);
  };

  const handleOnChannelSelect = (index, item) => {
    if (watchPartyData?.watchPartyInProgress) {
      showAlert('', "translate('switching_channel_will_end_call')", () => {
        endWatchParty();
        setCurrentIndex(index);
        handleSelectedChannel(index, item);
      });
    } else {
      setCurrentIndex(index);
      handleSelectedChannel(index, item);
    }
  };

  return (
    <ScrollView
      ref={verticalScrollRef}
      bouncesZoom={false}
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.verticalScroll}
      nestedScrollEnabled>
      <View style={styles.wrapper}>
        <ChannelsLeftBar
          isToday={isToday}
          channels={channels}
          currentIndex={currentIndex}
          handleOnChannelSelect={handleOnChannelSelect}
          getLeftCardLayout={
            leftBarCardWidth && leftBarCardHeight
              ? undefined
              : handleGetLeftCardLayout
          }
        />
        <View
          style={[
            styles.selectedChannelBorder,
            styles.verticalEdges,
            {
              top:
                currentIndex * ballyNormalizeWidth(64) +
                currentIndex * ballyNormalizeWidth(4),
              right: 0,
            },
          ]}
        />

        <ChannelSchedulesContainer
          channelDetail={channelDetail}
          isToday={isToday}
          channels={channels}
          leftBarCardHeight={leftBarCardHeight}
          currentIndex={currentIndex}
          handleOnChannelSelect={handleOnChannelSelect}
        />
      </View>
    </ScrollView>
  );
};
