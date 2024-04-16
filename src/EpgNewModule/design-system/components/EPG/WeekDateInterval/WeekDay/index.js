import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../../hooks/useTheme';
import { DynamicText } from '../../../../components/DynamicText';
import { generateStyle } from './styles';
import { formatDate } from '../../../../../utils/date';

export const WeekDay = ({ date, onPress, isSelected }) => {
  const { colors } = useTheme();
  const formattedDay = formatDate(date, 'iii');
  const formattedDayAndMonth = formatDate(date, 'dd/MM');
  const textColor = isSelected ? colors.app.ACCENT : colors.app.ACCENT_2;

  const styles = generateStyle(colors, isSelected);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        {isSelected && <View style={styles.topBar}></View>}
        <DynamicText
          variant='paragraph'
          color={textColor}
          bold={isSelected}
          align='center'
        >
          {formattedDay}
        </DynamicText>
        <DynamicText
          variant='small'
          color={textColor}
          bold={isSelected}
          align='center'
        >
          {formattedDayAndMonth}
        </DynamicText>
      </View>
    </TouchableOpacity>
  );
};
