import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../../../../../hooks/useTheme';
import {DynamicText} from '../../../../../components/DynamicText';
import {ballyNormalizeWidth, ballyNormalizeFont} from 'utils/responsivev2';
import {
  getCleanHour,
  getMinutesDifferenceBetweenDates,
} from '../../../../../../utils/date';
import {COLORS} from 'utils/colors';
// import translate from 'translations';
import {useEPGContext} from '../../../../../../contexts/EPGContext';
import {sortScheduleAsc} from './utils';
import {generateStyle} from './styles';
import {convertTo12Hour} from 'utils/commonMethods';
export const ChannelSchedules = ({schedules, channelId}) => {
  useEffect(() => {}, []);
  const {scrollWidthRef} = useEPGContext();

  const {colors} = useTheme();

  const styles = generateStyle(colors, ballyNormalizeWidth(64));

  let lastEndDate;

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: scrollWidthRef?.current * 24,
          overflow: 'hidden',
        },
      ]}>
      {schedules?.length &&
        schedules?.sort(sortScheduleAsc).map((schedule, index) => {
          if (lastEndDate === undefined) {
            lastEndDate = getCleanHour(schedule.start, 0);
          }

          let durationInMinutes = getMinutesDifferenceBetweenDates(
            schedule.end,
            schedule.start,
          );

          const cardWidth = scrollWidthRef?.current * (durationInMinutes / 60);

          lastEndDate = new Date(schedule.end);

          let formattedStartDate = new Date(schedule?.start);
          formattedStartDate = formattedStartDate.toTimeString().slice(0, 5);

          let formattedEndDate = new Date(schedule?.end);
          formattedEndDate = formattedEndDate.toTimeString().slice(0, 5);
          const backgroundColor = colors.app_light.PROGRAM_CARD_1;
          if (schedule?.isFiller) {
            return (
              <View
                style={[styles.wrapper]}
                key={`${channelId}-${schedule.id}-${index}`}>
                <View
                  style={[
                    styles.scheduleCard,
                    {
                      backgroundColor: colors.app.NO_PROGRAM,
                      justifyContent: 'center',
                      width:
                        index === schedules.length - 1
                          ? cardWidth + ballyNormalizeWidth(10)
                          : cardWidth,
                      borderRightWidth: ballyNormalizeWidth(2),
                      borderRightColor: colors.app.ACCENT,
                    },
                  ]}>
                  <Text style={[styles.programTitle, {color: COLORS.WHITE}]}>
                    {/* {translate('no_program_text')} */}
                    {'no_program_text'}
                  </Text>
                </View>
              </View>
            );
          }
          if (cardWidth) {
            return (
              <View
                style={[styles.wrapper]}
                key={`${channelId}-${schedule.id}-${index}`}>
                <View
                  style={[
                    styles.scheduleCard,
                    {
                      backgroundColor,
                      justifyContent: 'space-between',
                      width:
                        index === schedules.length - 1
                          ? cardWidth + ballyNormalizeWidth(10)
                          : cardWidth,
                      borderRightWidth: ballyNormalizeWidth(2),
                      borderRightColor: colors.app.ACCENT,
                    },
                    !schedule.catchupAvailable && {
                      backgroundColor: COLORS.MSKY_PRIMARY,
                    },
                  ]}>
                  <DynamicText
                    color={colors.app_light.PROGRAM_TITLE}
                    variant="medium"
                    numberOfLines={1}
                    style={[
                      styles.programTitle,
                      !schedule?.catchupAvailable && {color: COLORS.WHITE},
                    ]}>
                    {schedule.title}
                  </DynamicText>
                  <View style={styles.rowInfo}>
                    <DynamicText
                      style={[
                        {
                          fontSize: ballyNormalizeFont(10),
                        },
                        !schedule?.catchupAvailable && {color: COLORS.WHITE},
                      ]}
                      color={
                        colors.app_light.PROGRAM_TITLE
                      }>{`${convertTo12Hour(
                      formattedStartDate,
                    )} - ${convertTo12Hour(formattedEndDate)}`}</DynamicText>

                    {!schedule?.catchupAvailable && (
                      <View style={styles.liveBox}>
                        <View style={styles.liveBoxDot} />
                        <Text style={styles.liveTxt}>
                          {/* {translate('live')?.toUpperCase()} */}
                          {'live'}
                        </Text>
                      </View>
                    )}
                    {schedule?.catchupAvailable && (
                      <View style={styles.encoreBox}>
                        <Text style={styles.encoreText}>{'ENCORE'}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          }
        })}
    </View>
  );
};
