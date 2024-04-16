import React from 'react';
import {ScreenWrapper} from '../../design-system/components';
import {
  DayHourInterval,
  ChannelsContainer,
} from '../../design-system/components/EPG';
// import Loader from 'components/Loader';
import {Text} from 'react-native';

export const EPGScreen = ({
  loader,
  isToday,
  channels,
  onChannelChange,
  channelDetail,
  currentChannelIndex,
}) => {
  return (
    <ScreenWrapper>
      <>
        <DayHourInterval
          channels={channels}
          isToday={isToday}
          channelLength={channels?.length ?? 0}
        />
        {loader ? (
          <Text>Loader ...</Text>
        ) : (
          <ChannelsContainer
            channelDetail={channelDetail}
            isToday={isToday}
            onChannelChange={onChannelChange}
            loader={loader}
            channels={channels}
            currentChannelIndex={currentChannelIndex}
          />
        )}
      </>
    </ScreenWrapper>
  );
};
export default EPGScreen;
