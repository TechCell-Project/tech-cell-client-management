import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi', {
  relativeTime: {
    s: 'Vài giây',
    m: '%d phút',
    h: '%d giờ',
    d: '%d ngày',
    w: '%d tuần',
    M: '%d tháng',
    y: '%d năm',
  },
});
const momentVi = (date: Date | string | number) => moment(date);

export default momentVi;
