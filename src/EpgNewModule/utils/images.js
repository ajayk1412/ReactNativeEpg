import LOGO from '../design-system/assets/images/logo.png';

// Channels
import ACCEDO from '../design-system/assets/images/channels/accedo_logo.png';
import DISNEY from '../design-system/assets/images/channels/disney_logo.png';
import FOX from '../design-system/assets/images/channels/fox_logo.png';
import HBO from '../design-system/assets/images/channels/HBO_logo.png';
import SHOWTIME from '../design-system/assets/images/channels/showtime_logo.png';
import SIXX from '../design-system/assets/images/channels/sixx_logo.png';
import SKY from '../design-system/assets/images/channels/sky_logo.png';
import VOX from '../design-system/assets/images/channels/vox_logo.png';
import ZDF from '../design-system/assets/images/channels/ZDF_logo.png';

const CHANNELS = {
  ACCEDO,
  DISNEY,
  FOX,
  HBO,
  SHOWTIME,
  SIXX,
  SKY,
  VOX,
  ZDF,
};

export const IMAGES = {
  LOGO,
  CHANNELS: {
    ['ard']: CHANNELS.HBO,
    ['pro7']: CHANNELS.SIXX,
    ['arte-hd']: CHANNELS.DISNEY,
    ['antena3']: CHANNELS.FOX,
    ['lasexta']: CHANNELS.SHOWTIME,
    ['24h']: CHANNELS.VOX,
    ['a3series']: CHANNELS.ACCEDO,
    ['eurosport-de']: CHANNELS.SKY,
    ['zdf']: CHANNELS.ZDF,
  },
};
