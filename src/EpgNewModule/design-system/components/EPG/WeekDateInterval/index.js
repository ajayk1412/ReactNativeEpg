import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import {
  addDateDays,
  getEachDayOfInterval,
  subDateDays,
} from '../../../../utils/date';
import { useTheme } from '../../../../hooks/useTheme';
import { WeekDay } from './WeekDay';
import { generateStyle } from './styles';

export const WeekDateInterval = ({ onSelectDate, daysInterval = 7 }) => {
  const { colors } = useTheme();

  const currentDate = new Date();

  const flatListRef = useRef(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState();

  const lastPastDay = subDateDays(currentDate, daysInterval);
  const lastFutureDay = addDateDays(currentDate, daysInterval);
  const eachDayIntervalArray = getEachDayOfInterval(lastPastDay, lastFutureDay);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSelectedDay(daysInterval, currentDate);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToIndex = (index) => {
    flatListRef?.current?.scrollToIndex({
      index,
      viewPosition: 0.5,
    });
  };

  const handleScrollToIndexFailed = ({ highestMeasuredFrameIndex }) => {
    if (!flatListRef.current?.scrollToIndex) return;

    flatListRef?.current.scrollToIndex({
      index: highestMeasuredFrameIndex,
    });
  };

  const handleSelectedDay = (index, date) => {
    if (index === selectedDayIndex) return;

    scrollToIndex(index);
    setSelectedDayIndex(index);
    onSelectDate(date);
  };

  const renderDayItem = ({ item: dateItem, index }) => {
    const isSelected = selectedDayIndex === index;

    return (
      <WeekDay
        date={dateItem}
        onPress={() => handleSelectedDay(index, dateItem)}
        isSelected={isSelected}
      />
    );
  };

  const styles = generateStyle(colors);

  return (
    <FlatList
      ref={flatListRef}
      keyExtractor={(item, i) => `${item}-${i}`}
      data={eachDayIntervalArray}
      renderItem={renderDayItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.wrapper}
      onScrollToIndexFailed={handleScrollToIndexFailed}
    />
  );
};
