import React, { createContext, useContext, useRef, useState } from 'react';

const EPGContext = createContext(null);

export const EPGProvider = (props) => {
  const programsScrollRef = useRef(null);
  const scrollWidthRef = useRef(0);
  const [selectedTimeIntervalIndex, setSelectedTimeIntervalIndex] = useState(0);

  const handleScrollDayHourToIndex = (index) => {
    handleScrollToPrograms(index);
  };

  const handleScrollDayHourToOffset = (x) => {
    const endIndex = Math.round(x / scrollWidthRef.current);

    const isInvalidEndIndex = endIndex < 0 || endIndex > 23;

    if (isInvalidEndIndex) return;

    setSelectedTimeIntervalIndex(endIndex);
  };

  const handleScrollToPrograms = (index) => {
    programsScrollRef.current?.scrollTo({
      x: scrollWidthRef.current * index,
      animated: true,
    });
  };

  const onProgramsScroll = (event) => {
    const { x } = event.nativeEvent.contentOffset;

    handleScrollDayHourToOffset(x);
  };

  const onProgramsScrollEnd = (event) => {
    const { x } = event.nativeEvent.contentOffset;

    handleScrollDayHourToOffset(x);
  };

  const value = {
    programsScrollRef,
    scrollWidthRef,
    handleScrollDayHourToIndex,
    handleScrollToPrograms,
    onProgramsScroll,
    onProgramsScrollEnd,
    selectedTimeIntervalIndex,
    setSelectedTimeIntervalIndex,
  };

  return (
    <EPGContext.Provider value={value}>{props.children}</EPGContext.Provider>
  );
};

export const useEPGContext = () => {
  return useContext(EPGContext);
};
