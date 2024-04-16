import { FontIcons } from '../utils/fontIcons.enum';
import { Routes } from '../routes/enums/routeNames';

export const getTabBarIconNameByRoute = (routeName) => {
  switch (routeName) {
    case Routes.HOME:
      return FontIcons.HOME;
    case Routes.EPG:
      return FontIcons.EPG;
    case Routes.SETTINGS:
      return FontIcons.SETTINGS;
    default:
      return '';
  }
};
