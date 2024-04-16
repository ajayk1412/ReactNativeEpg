import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ballyNormalizeWidth } from 'utils/responsivev2';
import { ChannelSchedules } from '../../../../components/EPG';
import { useEPGContext } from '../../../../../contexts/EPGContext';
import { COLORS } from 'utils/colors';
import { useDispatch } from 'react-redux';
import { setCurrentContentStreamType } from 'services/Generic/action';
import { setCurrentContentStreamName } from '../../../../../../../services/Generic/action';

export const ChannelSchedulesContainer = ({
  channels,
  currentIndex,
  isToday,
  channelDetail,
  handleOnChannelSelect,
}) => {
  const dispatch = useDispatch();
  const currentContentTypeCheckerInterval = useRef(null);
  const {
    programsScrollRef,
    onProgramsScroll,
    onProgramsScrollEnd,
    scrollWidthRef,
  } = useEPGContext();
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(0);
  const [currentContentStreamIndex, setCurrentContentStreamIndex] =
    useState(null);
  useEffect(() => {
    setSelectedChannelIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (currentContentStreamIndex !== null) {
      clearInterval(currentContentTypeCheckerInterval.current);
      currentContentTypeCheckerInterval.current = setInterval(() => {
        if (
          new Date().getTime() >=
          channelDetail?.schedules[currentContentStreamIndex]?.end
        ) {
          if (
            currentContentStreamIndex + 1 <
            channelDetail?.schedules?.length
          ) {
            const streamType = channelDetail?.schedules[
              currentContentStreamIndex + 1
            ]?.catchupAvailable
              ? true
              : false;
            const streamName =
              channelDetail?.schedules[currentContentStreamIndex + 1]?.title;
            dispatch(setCurrentContentStreamType(streamType));
            setCurrentContentStreamIndex(currentContentStreamIndex + 1);
            dispatch(setCurrentContentStreamName(streamName));
          } else {
            const streamType = channelDetail?.schedules[0].catchupAvailable
              ? true
              : false;
            const streamName = channelDetail?.schedules[0]?.title;
            dispatch(setCurrentContentStreamType(streamType));
            setCurrentContentStreamIndex(0);
            dispatch(setCurrentContentStreamName(streamName));
          }

          clearInterval(currentContentTypeCheckerInterval.current);
        }
      }, 1000);
    }
  }, [currentContentStreamIndex]);
  useEffect(() => {
    const currentTime = new Date().getTime();
    channelDetail?.schedules?.length &&
      channelDetail?.schedules?.map((item, index) => {
        if (
          new Date(currentTime) >= new Date(item?.start).getTime() &&
          new Date(currentTime <= new Date(item.end)).getTime()
        ) {
          setCurrentContentStreamIndex(index);
        }
      });
    getCurrentContentStreamType(currentIndex);
  }, [currentIndex, channels?.length]);

  const getCurrentContentStreamType = (index) => {
    const currentTimeStamp = new Date().getTime();
    const currentShowStreamingDetails =
      channels?.length &&
      channels[index]?.schedules?.length &&
      channels[index]?.schedules.filter(
        (item, index) =>
          new Date(item.start) <= currentTimeStamp &&
          currentTimeStamp < new Date(item.end)
      )[0];
    const streamType = currentShowStreamingDetails?.catchupAvailable
      ? true
      : false;
    const streamName = currentShowStreamingDetails?.title;
    dispatch(setCurrentContentStreamType(streamType));
    dispatch(setCurrentContentStreamName(streamName));
  };

  const handleSelectChannel = (index, item) => {
    if (index === selectedChannelIndex) return;
    handleOnChannelSelect && handleOnChannelSelect(index, item);
  };

  return (
    <ScrollView
      ref={programsScrollRef}
      horizontal
      onScroll={onProgramsScroll}
      scrollEventThrottle={16}
      bouncesZoom={false}
      bounces={false}
      decelerationRate='fast'
      snapToInterval={scrollWidthRef?.current}
      onMomentumScrollEnd={onProgramsScrollEnd}
    >
      <View>
        {channels?.map((channel, index) => (
          <TouchableOpacity
            onPress={() => handleSelectChannel(index, channel)}
            style={[
              currentIndex === index && {
                backgroundColor: COLORS.MSKY_PRIMARY,
              },
            ]}
            activeOpacity={1}
          >
            <View style={styles.scheduleContainer}>
              <ChannelSchedules
                channelDetail={channelDetail}
                isToday={isToday}
                key={`${channel.id}-${index}`}
                schedules={channel.schedules}
                leftBarCardHeight={ballyNormalizeWidth(64)}
                channelId={channel.id}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    height: ballyNormalizeWidth(64),
    marginVertical: ballyNormalizeWidth(2),
    overflow: 'hidden',
  },
});
