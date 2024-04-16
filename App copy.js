import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  TVGuideMobile,
  MOBILE_GUIDE_CONSTANTS,
  getStartDayTimestamp,
} from 'tvapps-epg-mobile';
const NUMBER_CHANNEL_DISPLAY = 10;
const SIZE_PER_PAGE = 2 * NUMBER_CHANNEL_DISPLAY;

var allProgramListSafe = [];
var today = new Date();
var channelExternalIDList = [];
var dateFilter = new Date();
var pageOffset = 1;
const channeList = [
  {
    imageSrc:
      'https://votvapps-ng-test.tvaas.com/RTEFacade/images/attachments/TV2.png',
    id: 1895201,
    externalChannelId: 'LuxeTV',
    name: 'Luxe TV',
    url: '',
    description: '',
    category: '',
    extrafields: [
      {
        responseElementType: 'Extrafield',
        name: 'static-playback',
        value: 'false',
      },
    ],
    number: 12,
    npvrEnabled: false,
    isNpvrActivated: false,
    isCatchupActivated: false,
    catchupEnabled: false,
    favouriteEnabled: false,
    isFavouriteActivated: false,
    purchaseEnabled: false,
    isPurchaseActivated: false,
  },
];

const programList = [
  {
    channelExternalId: 'LuxeTV',
    programs: [
      {
        id: 12966715,
        name: 'Los milagros de la rosa',
        shortName: '',
        serisName: '',
        description: '',
        imageSrc:
          'https://votvapps-ng-test.tvaas.com/RTEFacade/images/12055411.jpg',
        prName: 'APT',
        startDate: 1712266200000, //(timestamp)
        endDate: 1712268000000, //(timestamp)
        startDateAdjusted: 1712266200000, // default equal to startDate (timestamp), adjusted to fix start of day (00:00:00)
        endDateAdjusted: 1712268000000, // default equal to endDate (timestamp), adjusted to fix end of day (23:59:59)
        referanceProgramId: '2466657917202201091800120',
        flags: 0,
        seriesSeasion: '',
        responseElementType: 'Program',
        price: 0.0,
        genres: [],
        prLevel: 0,
      },
    ],
  },
];

const App = () => {
  const [channelListState, setChannelListState] = useState(channeList);
  const [programListState, setProgramListState] = useState(programList);
  const [currentDateDisplay, setCurrentDateDisplay] = useState(new Date());
  const [isLastPageOffset, setIsLastPageOffset] = useState(false);
  const onReadEndChannelsPrograms = () => {
    const channelListExternalChannelId = [
      ...channelExternalIDList.slice(
        pageOffset * SIZE_PER_PAGE,
        (pageOffset + 1) * SIZE_PER_PAGE,
      ),
    ];
    if (channelListExternalChannelId.length > 0) {
      // get program
      //   dispatch(
      //     getProgramsByChannelsAction(
      //       channelListExternalChannelId,
      //       currentDateDisplay,
      //     ),
      //   );
      pageOffset++;
    }
  };
  const onDateChange = useCallback(async dateValue => {
    // await dispatch(
    //   getProgramsByChannelsAction(
    //     [...channelExternalIDList.slice(0, SIZE_PER_PAGE)],
    //     dateValue,
    //   ),
    // );
    dateFilter = dateValue;
    setCurrentDateDisplay(dateValue);
    setIsLastPageOffset(false);
  }, []);

  const onProgramSelectedChange = useCallback(({program}) => {
    console.log('onProgramSelectedChange: ', program);
  }, []);

  return (
    <View style={styles.container}>
      <TVGuideMobile
        tvGuideWidth={MOBILE_GUIDE_CONSTANTS.DEVICE_WIDTH}
        tvGuideHeight={MOBILE_GUIDE_CONSTANTS.DEVICE_HEIGHT - 20}
        timeLineHeaderHeight={30}
        numberOfChannelsDisplayed={NUMBER_CHANNEL_DISPLAY}
        numberOfTimelineCellDisplayed={2}
        channeList={channelListState}
        programList={programListState}
        numberOfFutureDays={3}
        numberOfPastDays={2}
        currentDate={currentDateDisplay}
        onReachingEndChannel={onReadEndChannelsPrograms}
        programStylesColors={{
          activeProgramBackgroundColor: '#463cb4',
          currentProgramBacgroundColor: '#FFFFFF',
          pastProgramBackgroundColor: '#463db4',
          futureProgramBackgroundColor: '#463cb4',
          activeProgramTextColor: '#FFFFFF',
          currrentProgramTextColor: '#000000',
          pastProgramTextColor: '#ffffff',
          futureProgramTextColor: '#FFFFFF',
          startDateProgramBackgroundColor: '#c34164',
          startDateProgramTextColor: '#FFFFFF',
          startDateProgramTextFontSize: 15,
          programNameFontSize: 16,
        }}
        timeLineHeaderTextFontSize={18}
        timeIndicatorStyles={{
          backgroundColor:
            MOBILE_GUIDE_CONSTANTS.THEME_STYLES.LOADING_INDICATOR_COLOR,
          width: 6,
          borderRadius: 3,
        }}
        containerBackroundColor={'#0b004c'}
        programLineHeight={60}
        channelListWidth={70}
        onDateChange={onDateChange}
        onProgramSelectedChange={onProgramSelectedChange}
        sizePerPage={SIZE_PER_PAGE}
        isLastPageOffset={isLastPageOffset}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
});
