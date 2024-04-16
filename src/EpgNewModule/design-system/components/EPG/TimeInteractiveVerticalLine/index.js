import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  getMinutesDifferenceBetweenDates,
  getSecondsDifferenceBetweenDates,
} from '../../../../utils/date';
import { useTheme } from '../../../../hooks/useTheme';
import { generateStyle } from './styles';
import { ballyNormalizeWidth } from 'utils/responsivev2';
import Pointer from '/platformAssets/runtime/SVG/pointer.svg';
export const TimeInteractiveVerticalLine = ({
  moveTimeType,
  startDate,
  xStartPosition,
  xEndPosition,
  onEndReached,
  showLine,
  totalMinutesInterval,
  channelLength,
}) => {
  const { colors } = useTheme();

  const [liveDate, setLiveDate] = useState(new Date());

  useEffect(() => {
    const timeToWait = moveTimeType === 'seconds' ? 1000 : 1000 * 60;

    const interval = setInterval(() => {
      setLiveDate(new Date());
    }, timeToWait);

    return () => clearInterval(interval);
  }, []);

  const getLinePositionFromLiveDate = () => {
    let lineHorizontalPosition = 0;

    if (moveTimeType === 'seconds') {
      const differenceInSeconds = getSecondsDifferenceBetweenDates(
        liveDate,
        startDate
      );

      const totalSecondsInterval = totalMinutesInterval * 60;
      lineHorizontalPosition =
        (differenceInSeconds / totalSecondsInterval) * xEndPosition;
    } else {
      const differenceInMinutes = getMinutesDifferenceBetweenDates(
        liveDate,
        startDate
      );

      lineHorizontalPosition =
        (differenceInMinutes / totalMinutesInterval) * xEndPosition;
    }

    const endReached = lineHorizontalPosition > xEndPosition;

    if (endReached) {
      onEndReached();
    }

    return lineHorizontalPosition;
  };

  const styles = generateStyle(
    colors,
    xStartPosition,
    xEndPosition,
    getLinePositionFromLiveDate(),
    showLine
  );

  return (
    <>
      {showLine && (
        <View
          style={styles.thinCenterVerticalLine(channelLength)}
          pointerEvents='none'
        >
          <View
            style={{
              bottom: ballyNormalizeWidth(10),
              left: -ballyNormalizeWidth(5),
            }}
          >
            <Pointer />
          </View>
        </View>
      )}
    </>
  );
};
