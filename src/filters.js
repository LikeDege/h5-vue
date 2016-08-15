//玩法类型
import { JOURNEY_TYPE_LONGLINE, JOURNEY_TYPE_FEATURE, JOURNEY_TYPE_GUIDE, JOURNEY_TYPE_AIRPORT } from './common/constants';

export const transJourneyType = (journeyType) => {
  let str;
  journeyType = parseInt(journeyType);
  switch (journeyType) {
    case JOURNEY_TYPE_LONGLINE:
      str = '长线玩法';
      break;
    case JOURNEY_TYPE_FEATURE:
      str = '特色项目';
      break;
    case JOURNEY_TYPE_GUIDE:
      str = '向导服务';
      break;
    case JOURNEY_TYPE_AIRPORT:
      str = '机场接送';
      break;
    default:
  }
  return str;
};