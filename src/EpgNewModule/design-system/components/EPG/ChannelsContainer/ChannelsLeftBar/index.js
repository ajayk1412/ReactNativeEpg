import { View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { styles } from './styles';
import { ImageURLPath } from 'utils/constants';
import { ChannelCard } from '../../../../components/EPG';

export const ChannelsLeftBar = ({
  channels,
  getLeftCardLayout,
  isToday,
  currentIndex,
  handleOnChannelSelect,
}) => {
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(0);

  useEffect(() => {
    setSelectedChannelIndex(currentIndex);
  }, [currentIndex]);

  const handleSelectChannel = (index, item) => {
    if (index === selectedChannelIndex) return;
    handleOnChannelSelect && handleOnChannelSelect(index, item);
  };

  const handleGetCardLayout = ({ width, height, x, y }) => {
    getLeftCardLayout && getLeftCardLayout({ width, height, x, y });
  };

  return (
    <View>
      {channels?.map((channel, index) => {
        return (
          <View key={channel?.id + index} style={styles.wrapper}>
            <ChannelCard
              isToday={isToday}
              key={`${channel.id}-${index}`}
              logo={`${ImageURLPath}${channel?.channelLogo}`}
              onPress={() => handleSelectChannel(index, channel)}
              isSelected={selectedChannelIndex === index}
              getLayout={handleGetCardLayout}
            />
          </View>
        );
      })}
    </View>
  );
};
