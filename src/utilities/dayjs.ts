import baseDayJs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import CustomFormat from "dayjs/plugin/customParseFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import LocaleData from "dayjs/plugin/localeData";
import IsBetween from "dayjs/plugin/isBetween";

import "dayjs/locale/pl";
import "dayjs/locale/en-gb";

baseDayJs.extend(RelativeTime);
baseDayJs.extend(CustomFormat);
baseDayJs.extend(LocalizedFormat);
baseDayJs.extend(LocaleData);
baseDayJs.extend(IsBetween);

baseDayJs.locale("en-gb");

export const dayjs = baseDayJs;
