import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getDayHoursIntervals,
  getDateIndexFromInterval,
} from '../../../../utils/date';
import { useTheme } from '../../../../hooks/useTheme';
import { DynamicText } from '../..';
import { TimeInteractiveVerticalLine } from '../../../components/EPG';
import { CHANNEL_LEFT_BAR_WIDTH } from '../../../components/EPG/ChannelsContainer/ChannelsLeftBar/styles';
import { ScreenWidth } from '../../../../utils/dimensions';
import { useEPGContext } from '../../../../contexts/EPGContext';
import { generateStyle, RIGHT_PADDING } from './styles';
import { COLORS } from '../../../../../../utils/constants';
import { ballyNormalizeWidth } from 'utils/responsivev2';
import { convertTo12Hour } from '../../../../../../utils/commonMethods';

const currentDate = new Date();
const hoursInterval = 1;
let dayHoursInterval = getDayHoursIntervals(currentDate, hoursInterval);
const currentDateIndex = getDateIndexFromInterval(
  currentDate,
  dayHoursInterval
);

export const DayHourInterval = ({
  minutesInterval = 60,
  channelLength,
  channels,
}) => {
  const {
    handleScrollDayHourToIndex,
    scrollWidthRef,
    handleScrollToPrograms,
    selectedTimeIntervalIndex,
    setSelectedTimeIntervalIndex,
  } = useEPGContext();

  const { colors } = useTheme();

  const [textWidth] = useState(0);
  const [liveTimeIntervalIndex, setLiveTimeIntervalIndex] =
    useState(currentDateIndex);

  const paddingLeft = CHANNEL_LEFT_BAR_WIDTH;
  const xLineStartPosition = paddingLeft;
  const xMarkLineLeftPosition = xLineStartPosition - ballyNormalizeWidth(2);
  const xMarkLineRightPosition = ScreenWidth - textWidth / 2 - RIGHT_PADDING;
  const xLineEndPosition = xMarkLineRightPosition - paddingLeft;
  scrollWidthRef.current = xLineEndPosition;

  useEffect(() => {
    setTimeout(() => {
      setSelectedTimeIntervalIndex(currentDateIndex);
      handleScrollToPrograms(liveTimeIntervalIndex);
    }, 500);
  }, [channelLength]);

  useEffect(() => {
    setSelectedTimeIntervalIndex(currentDateIndex);
    handleScrollToPrograms(liveTimeIntervalIndex);
  }, [channels]);

  const startInteractiveLineDate =
    dayHoursInterval[liveTimeIntervalIndex].startTime.date;

  const styles = generateStyle(
    colors,
    textWidth,
    xMarkLineLeftPosition,
    xMarkLineRightPosition
  );

  const handleChangeInterval = (nextIntervalIndex) => {
    const shouldChangeInterval =
      nextIntervalIndex !== selectedTimeIntervalIndex &&
      nextIntervalIndex >= 0 &&
      nextIntervalIndex <= 23;

    if (shouldChangeInterval) {
      handleScrollDayHourToIndex(nextIntervalIndex);
    }
  };

  const goToNextFutureInterval = () => {
    handleChangeInterval(selectedTimeIntervalIndex + 1);
  };

  const goToNextPastInterval = () => {
    handleChangeInterval(selectedTimeIntervalIndex - 1);
  };

  const onCurrentIntervalEndReached = () => {
    const nextIndex =
      liveTimeIntervalIndex + 1 > 23 ? 0 : liveTimeIntervalIndex + 1;
    if (nextIndex === 0) {
      const todayDate = new Date();
      dayHoursInterval = getDayHoursIntervals(todayDate, hoursInterval);
    }
    setLiveTimeIntervalIndex(nextIndex);
    handleChangeInterval(nextIndex);
  };

  return (
    <View>
      <View style={styles.wrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToNextPastInterval}
          style={styles.intervalPressable}
        >
          {selectedTimeIntervalIndex > 0 ? (
            <MaterialCommunityIcons
              name='chevron-left'
              size={22}
              color={COLORS.APP_WHITE}
              style={styles.leftChevron}
            />
          ) : (
            <View style={{ width: 22 }} />
          )}
          <DynamicText
            variant='header3'
            color={colors.app.ACCENT}
            style={styles.hourText}
          >
            {convertTo12Hour(
              dayHoursInterval[selectedTimeIntervalIndex]?.startTime?.formatted
            )}
          </DynamicText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToNextFutureInterval}
          style={styles.intervalPressable}
        >
          <DynamicText
            variant='header3'
            color={colors.app.ACCENT}
            style={styles.hourText}
          >
            {convertTo12Hour(
              dayHoursInterval[selectedTimeIntervalIndex]?.endTime?.formatted
            )}
          </DynamicText>
          {selectedTimeIntervalIndex < 23 ? (
            <MaterialCommunityIcons
              name='chevron-right'
              size={22}
              color={COLORS.APP_WHITE}
              style={styles.rightChevron}
            />
          ) : (
            <View style={{ width: 22 }} />
          )}
        </TouchableOpacity>
      </View>

      <TimeInteractiveVerticalLine
        channelLength={channelLength}
        moveTimeType='seconds'
        totalMinutesInterval={minutesInterval * hoursInterval}
        startDate={startInteractiveLineDate}
        xStartPosition={xLineStartPosition}
        xEndPosition={xLineEndPosition}
        showLine={selectedTimeIntervalIndex === liveTimeIntervalIndex}
        showPastShadow={selectedTimeIntervalIndex <= liveTimeIntervalIndex}
        onEndReached={onCurrentIntervalEndReached}
      />
    </View>
  );
};
