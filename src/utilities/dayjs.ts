import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import CustomFormat from "dayjs/plugin/customParseFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import LocaleData from "dayjs/plugin/localeData";
import IsBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/en-gb";
import "dayjs/locale/pl";
import "dayjs/locale/nl";

dayjs.extend(RelativeTime);
dayjs.extend(CustomFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(LocaleData);
dayjs.extend(IsBetween);

export const updateDayjsLocale = (locale: string) => dayjs.locale(locale);
